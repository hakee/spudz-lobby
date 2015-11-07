FROM centos:centos7.1.1503

RUN yum install -y wget tar gcc gcc-c++ make krb5-devel
WORKDIR /tmp
RUN wget https://nodejs.org/dist/v4.2.1/node-v4.2.1.tar.gz
RUN tar xvf node-v4.2.1.tar.gz
WORKDIR /tmp/node-v4.2.1
RUN ls
RUN ./configure 
RUN  make
RUN  make install


COPY . /spudz_lobby

RUN cd /spudz_lobby; npm install

EXPOSE  8000

CMD ["node", "/spudz_lobby/server.js"]
