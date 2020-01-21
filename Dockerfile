# docker build -t ubuntu1604py36
FROM ubuntu:16.04
# Install Python 3.6
RUN apt-get update && \
        apt-get install -y software-properties-common && \
        add-apt-repository ppa:deadsnakes/ppa && \
        apt-get update -y  && \
        apt-get install -y build-essential python3.6 python3.6-dev python3-pip && \
        apt-get install -y vim  && \
        apt-get install -y net-tools   && \
        # update pip
        python3.6 -m pip install pip --upgrade && \
        python3.6 -m pip install wheel && \
        python3.6 -m pip install netifaces && \
        python3.6 -m pip install flask
# copy flask project        
COPY machine_flask_api.py ./
ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8
EXPOSE 5500

CMD ["flask","run", "--host=0.0.0.0"]