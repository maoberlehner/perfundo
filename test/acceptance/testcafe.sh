#!/bin/bash

browsers=( "browserstack:ie@10.0:Windows 8" "browserstack:ie@11.0:Windows 10" "browserstack:edge:Windows 10" "browserstack:firefox:Windows 10" "browserstack:chrome:Windows 10" "browserstack:opera:Windows 10" "browserstack:safari:OS X High Sierra" )

for i in "${browsers[@]}"
do
	./node_modules/.bin/testcafe "${i}" test/acceptance/ --app 'http-server demo/ -p 1337 -s'
done
