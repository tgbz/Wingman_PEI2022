import cv2
import pytesseract
import numpy as np
import argparse    
from PIL import Image
from os import path
from typing import TypeVar, Callable, Sequence
from functools import reduce
import itertools as it
#import jiwer
from scipy.ndimage import interpolation as inter
#import mediapipe as mp
#import rembg 
import imutils
import math


def parse():
    ap = argparse.ArgumentParser()
    ap.add_argument("image",
        help="path to input receipt image")
    ap.add_argument("-d", "--debug", default=False, action='store_true',
        help="whether or not we are visualizing each step of the pipeline")
    ap.add_argument("-o", "--output", default=False, action='store_true',
        help="whether or not results are exported to a txt file")
    args = vars(ap.parse_args())

    return args['image'], args['debug'], args['output']



T = TypeVar('T')
def pipeline(value: T,
            function_pipeline: Sequence[Callable[[T], T]],) -> T:    
    return reduce(lambda v, f: f(v), function_pipeline, value)



def show(image,window="Image",stop = True):
    cv2.imshow(window, image)
    if stop: cv2.waitKey(0)
    


#Normalizes image color
def normalize(image,debug = False):
    norm = np.zeros((image.shape[0], image.shape[1]))
    final = cv2.normalize(image, norm, 0, 255, cv2.NORM_MINMAX)

    if debug: show(final,'Normalized')
    return final


def remove_shadows(image,debug = False):
    rgb_planes = cv2.split(image)

    result_planes = []
    result_norm_planes = []
    for plane in rgb_planes:
        dilated_img = cv2.dilate(plane, np.ones((7,7), np.uint8))
        bg_img = cv2.medianBlur(dilated_img, 21)
        diff_img = 255 - cv2.absdiff(plane, bg_img)
        norm_img = cv2.normalize(diff_img,None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)
        result_planes.append(diff_img)
        result_norm_planes.append(norm_img)

    result = cv2.merge(result_planes)
    return result

def crop_rect(img, rect):
    # get the parameter of the small rectangle
    center = rect[0]
    size = rect[1]
    angle = rect[2]
    center, size = tuple(map(int, center)), tuple(map(int, size))

    # get row and col num in img
    rows, cols = img.shape[0], img.shape[1]

    M = cv2.getRotationMatrix2D(center, angle, 1)
    img_rot = cv2.warpAffine(img, M, (cols, rows))
    out = cv2.getRectSubPix(img_rot, size, center)

    return out, img_rot


def dskw(image,coord):
    
    # assume coord is a list with 8 float values, the points of the rectangle area should
    # have be clockwise

    # cv2.drawContours(img, [cnt], 0, (128, 255, 0), 3)
    # find the rotated rectangle enclosing the contour
    # rect has 3 elments, the first is rectangle center, the second is
    # width and height of the rectangle and the third is the rotation angle
    print(coord)
    rect = cv2.minAreaRect(coord)
    print("rect: {}".format(rect))
    # convert rect to 4 points format
    box = cv2.boxPoints(rect)
    box = np.int0(box)
    print("bounding box: {}".format(box))

    # draw the roated rectangle box in the image
    cv2.drawContours(image, [box], 0, (0, 0, 255), 2)
    
    # crop the rotated rectangle from the image
    im_crop, img_rot = crop_rect(image, rect)
    # print("size of original img: {}".format(img.shape))
    # print("size of rotated img: {}".format(img_rot.shape))
    # print("size of cropped img: {}".format(im_crop.shape))
    
    cv2.imshow("cropped_box", im_crop)
    cv2.imshow("original contour", image)
    cv2.imshow("rotated image", img_rot)
    
    cv2.waitKey(0)
    return img_rot


def deskew(image,delta=1, limit=5,debug = False):
    def determine_score(arr, angle):
        data = inter.rotate(arr, angle, reshape=False, order=0)
        histogram = np.sum(data, axis=1)
        score = np.sum((histogram[1:] - histogram[:-1]) ** 2)
        return histogram, score

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    thresh = cv2.threshold(gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)[1] 

    scores = []
    angles = np.arange(-limit, limit + delta, delta)
    for angle in angles:
        histogram, score = determine_score(thresh, angle)
        scores.append(score)

    best_angle = angles[scores.index(max(scores))]

    (h, w) = image.shape[:2]
    center = (w // 2, h // 2)
    M = cv2.getRotationMatrix2D(center, best_angle, 1.0)

    rotated = cv2.warpAffine(image, M, (w, h), flags=cv2.INTER_CUBIC, \
              borderMode=cv2.BORDER_REPLICATE)

    
    if debug: show(rotated,'Deskewd')
    return rotated
    



#Scales the image so it has at least 300 dpi
def scaling(image,debug = False):
    color_converted = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    im = Image.fromarray(color_converted)

    length_x, width_y = im.size
    factor = min(1, float(1024.0 / length_x))
    size = int(factor * length_x), int(factor * width_y)

    resized = np.array(im.resize(size, Image.Resampling.LANCZOS))
    final = cv2.cvtColor(resized, cv2.COLOR_RGB2BGR) 
    if debug: show(final,'scaling')
    return final



#Eliminates noise of a colored image
def remove_noise_colored(image,debug = False):
    final = cv2.fastNlMeansDenoisingColored(image, None, 10, 10, 7, 15)
    if debug: show(final,'noise_colored')
    return final
    


#Eliminates noise of a grayscale image
def remove_noise(image,debug = False):
    final = cv2.fastNlMeansDenoising(image, None, 3, 7, 21)
    if debug: show(final,'noise')
    return final



def binaryAdaptative(image,debug = False):
    image = remove_noise(image)
    image = grayscale(image)
    final = cv2.adaptiveThreshold(image,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    if debug: show(final,'binaryAdpt')
    return final



def gaussianBlur(image,debug = False):
    final = cv2.GaussianBlur(image,(5,5),0)
    if debug: show(final,'Gaussian')
    return final



#Turns each pixel into 0 or 1 depending on a threshold using otsus binarization
def binaryOtsuGauss(image,debug = False):
    _,final = cv2.threshold(image,0,255,cv2.THRESH_BINARY+cv2.THRESH_OTSU)
    if debug: show(final,'binary')
    return final



#Turns the image to grayscale
def grayscale(image,debug = False):
    final = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    if debug: show(final,'grayscale')
    return final



# Automatic brightness and contrast optimization with optional histogram clipping
def brightness_contrast(image, clip_hist_percent=1,debug = False):
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    # Calculate grayscale histogram
    hist = cv2.calcHist([gray],[0],None,[256],[0,256])
    hist_size = len(hist)
    
    # Calculate cumulative distribution from the histogram
    accumulator = []
    accumulator.append(float(hist[0]))
    for index in range(1, hist_size):
        accumulator.append(accumulator[index -1] + float(hist[index]))
    
    # Locate points to clip
    maximum = accumulator[-1]
    clip_hist_percent *= (maximum/100.0)
    clip_hist_percent /= 2.0
    
    # Locate left cut
    minimum_gray = 0
    while accumulator[minimum_gray] < clip_hist_percent:
        minimum_gray += 1
    
    # Locate right cut
    maximum_gray = hist_size -1
    while accumulator[maximum_gray] >= (maximum - clip_hist_percent):
        maximum_gray -= 1
    
    # Calculate alpha and beta values
    alpha = 255 / (maximum_gray - minimum_gray)
    beta = -minimum_gray * alpha

    final = cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
    if debug: show(final,'b&c')
    return final



#Removes background of an image
def remove_bg(image,debug = False):
    change_background_mp = mp.solutions.selfie_segmentation
    change_bg_segment = change_background_mp.SelfieSegmentation(1)

    rgb_img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    result = change_bg_segment.process(rgb_img)

    binary_mask = result.segmentation_mask

    cv2.imshow("mask", binary_mask)
    cv2.imshow("image", image)
    cv2.waitKey()

    binary_mask_3 = np.dstack((binary_mask,binary_mask,binary_mask))

    image = np.where(binary_mask_3, image, 255)    
 
    if debug: show(image) 
    return image

def padding(image):
    old_image_height, old_image_width, channels = image.shape
    print(channels)

    # create new image of desired size and color (blue) for padding
    new_image_width = old_image_width+100
    new_image_height = old_image_height+100

    color = (0,0,0,0)
    result = np.full((new_image_height,new_image_width, channels), color, dtype=np.uint8)

    # compute center offset
    x_center = (new_image_width - old_image_width) // 2
    y_center = (new_image_height - old_image_height) // 2

    # copy image image into center of result image
    result[y_center:y_center+old_image_height,x_center:x_center+old_image_width] = image

    return result

#Removes background of an image
def remove_bg2(image,debug = True):
    h,w,c = image.shape
    image = rembg.remove(image)
    image = padding(image)

    print('1')
    blurred = gaussianBlur(image)
    show(blurred)
    print('2')
    edged = cv2.Canny(blurred, 75, 200)
    show(edged) 
    print('3')
    cnts = cv2.findContours(edged.copy(), cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)



    print('4')
    cnts = imutils.grab_contours(cnts)
    print('5')
    #cnts = sorted(cnts, key=cv2.contourArea, reverse=True)
    print('6')
    '''

    # initialize a contour that corresponds to the receipt outline
    receiptCnt = None
    # loop over the contours
    for c in cnts:
        # approximate the contour
        peri = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.02 * peri, True)
        # if our approximated contour has four points, then we can
        # assume we have found the outline of the receipt
        if len(approx) == 4:
            receiptCnt = approx
            break
    print('7')

    output = image.copy()
    cv2.drawContours(output, [receiptCnt], -1, (0, 255, 0), 2)
    
    print('8')
    cv2.imshow("Receipt Outline", output)
    cv2.waitKey(0)
    '''
    
    image = grayscale(image)
    mask = np.zeros_like(image) # Create mask where white is what we want, black otherwise
    cv2.drawContours(mask, cnts, -1, 255, -1) # Draw filled contour in mask
    show(mask) 
    out = np.zeros_like(image) # Extract out the object and place into output image
    out[mask == 255] = image[mask == 255]

    # Now crop
    arr = np.where(mask == 255)
    yArr,xArr=arr
    print(mask)
    print(arr)
    lu = [xArr[0],yArr[0]]
    ru = [xArr[0],yArr[0]]
    ld = [xArr[0],yArr[0]]
    rd = [xArr[0],yArr[0]]
    for i in range(len(xArr)):  
        if math.dist((0,0),(xArr[i],yArr[i])) < math.dist((0,0),(lu[0],lu[1])):
            lu = [xArr[i],yArr[i]]
        if math.dist((0,w),(xArr[i],yArr[i])) < math.dist((0,w),(ru[0],ru[1])):
            ru = [xArr[i],yArr[i]]
        if math.dist((h,0),(xArr[i],yArr[i])) < math.dist((h,0),(ld[0],ld[1])):
            ld = [xArr[i],yArr[i]]
        if math.dist((h,w),(xArr[i],yArr[i])) < math.dist((h,w),(rd[0],rd[1])):
            rd = [xArr[i],yArr[i]]
        
    coords = np.array([[lu],[ru],[ld],[rd]])





    '''(topy, topx) = (np.min(y), np.min(x))
    (bottomy, bottomx) = (np.max(y), np.max(x))
    out = out[topy:bottomy+1, topx:bottomx+1]'''


    # Show the output image
    cv2.imshow('Output', out)
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    
    image = dskw(image,coords)

    if debug: show(out,'abcde') 
    cv2.imwrite("lena_centered.jpg", out)
    return out



def gen_name(name):
    file = f'_{name}.txt'
    i = 1
    if path.exists(f'_{name}.txt'):
        while(True):
            file = f'_{name}{i}.txt'
            if not path.exists(file): 
                break
            i += 1
    return file
    


def generate_text(name,image,out = False):
    text = pytesseract.image_to_string(image)
    if out:
        with open(gen_name(name.replace('>', '')), "w") as f:
            f.write(text)
            f.close()
    return text



def score(out,file):
    with open(file, "r") as f:
        real = f.read()
        f.close()
    #cer = jiwer.cer(real, out)*100
    #wer = jiwer.wer(real, out)*100
    cers = "0"
    wers = "0"
    print(f'Character error: {cers}%\nWord error: {wers}%\n')
    return cer,wer
    


if __name__ == "__main__":
    

    filename,debug,output = parse()

    orig = cv2.imread(filename)
    if debug: show(orig,'Original')
    image = orig.copy()

    #availableProcesses = [normalize,remove_noise,remove_shadows]
    availableProcesses = [remove_bg2,normalize]
    #availableProcesses = [binaryAdaptative,normalize,grayscale,gaussianBlur,remove_noise,scaling,brightness_contrast]

    arr = [availableProcesses]
    for L in range(len(availableProcesses) + 1):
        for subset in it.combinations(availableProcesses, L):
            arr.append(subset)
    arr = [[remove_bg2]]

    results = {}
    #pl = (normalize,scaling,remove_noise_colored,brightness_contrast)
    iter = 1
    for i in arr: 
        name = ''
        fst = True
        for f in i:
            if not fst:
                name += '->'
            fst = False
            name += f.__name__ 
        if name == '':
            name = 'NoPreprocessing'
        print(f"Trying {name}\n({iter}/{len(arr)})")
        iter += 1
        #try:
        cer,wer = score(generate_text(name,pipeline(image,i),output),'truerec3.txt')
        results[name] = [cer,wer]
        #except:
            #print(f"Error in {name}\n")
            #continue


    print("Done!")
    a = sorted(results.items(), key=lambda x: x[1][0])  

    for ii in a:
        print(ii[0] + '\ncer: ' + "{:.2f}".format(ii[1][0]) + '\n' + 'wer: ' + "{:.2f}".format(ii[1][1]) + '\n\n')  



'''remove_noise
cer: 10.94
wer: 48.28

remove_noise->scaling
cer: 10.94
wer: 48.28

normalize->remove_noise
cer: 11.04
wer: 45.69

normalize->remove_noise->scaling
cer: 11.04
wer: 45.69

normalize->remove_noise->brightness_contrast
cer: 11.35
wer: 48.28

normalize->remove_noise->scaling->brightness_contrast
cer: 11.35
wer: 48.28

normalize
cer: 11.45
wer: 46.55

normalize->scaling
cer: 11.45
wer: 46.55

normalize->brightness_contrast
cer: 11.45
wer: 45.69

normalize->scaling->brightness_contrast
cer: 11.45
wer: 45.69

No Preprocessing
cer: 11.65
wer: 46.55

scaling
cer: 11.65
wer: 46.55

brightness_contrast
cer: 11.96
wer: 50.00

scaling->brightness_contrast
cer: 11.96
wer: 50.00

normalize->gaussianBlur->remove_noise->brightness_contrast
cer: 13.07
wer: 56.03'''