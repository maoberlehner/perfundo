#!/bin/bash

browsers=( "browserstack:ie@10.0:Windows 8" "browserstack:ie@11.0:Windows 10" "browserstack:edge@15.0:Windows 10" "browserstack:edge@14.0:Windows 10" "browserstack:firefox@54.0:Windows 10" "browserstack:firefox@55.0:Windows 10" "browserstack:chrome@59.0:Windows 10" "browserstack:chrome@60.0:Windows 10" "browserstack:opera@46.0:Windows 10" "browserstack:opera@47.0:Windows 10" "browserstack:safari@9.1:OS X El Capitan" "browserstack:safari@10.1:OS X Sierra" )

for i in "${browsers[@]}"
do
	./node_modules/.bin/testcafe "${i}" test/acceptance/ --app 'http-server demo/ -p 1337 -s'
done
