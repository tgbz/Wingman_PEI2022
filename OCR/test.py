import zipfile
import os
import shutil


#shutil.make_archive('file', format='zip', root_dir='\\receivedFiles')

fileDir = os.getcwd() + "\\receivedFiles\\"
r = shutil.unpack_archive(os.getcwd() +"\\file.zip", os.getcwd() + "\\receivedFiles")
files = os.listdir(fileDir)
files = [fileDir+f for f in files if os.path.isfile(fileDir+f)]
print(files)

#with zipfile.ZipFile("file.zip", 'r') as zip_ref:
 #   zip_ref.extractall(os.getcwd() + "\\receivedFiles")