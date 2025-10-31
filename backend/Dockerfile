FROM python:3.13.7

WORKDIR /code

COPY ./requirements.txt /code/requirements.txt

RUN python -m pip install -r /code/requirements.txt

COPY . /code/

CMD ["fastapi", "run", "main.py", "--port", "80"]