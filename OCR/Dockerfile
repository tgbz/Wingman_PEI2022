FROM python:3.10.9

WORKDIR /OCRApp

COPY requirements.txt requirements.txt
RUN python3 -m pip install --upgrade pip
RUN pip3 install -r requirements.txt
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install tesseract-ocr
RUN apt-get -y install ffmpeg
RUN apt-get -y install libsm6
RUN apt-get -y install libxext6

COPY *.py .
COPY *.json .

CMD [ "python3", "-m" , "flask", "run" ,"--host=0.0.0.0"]