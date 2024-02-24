#! /bin/bash

fir=/d/MY_BLOG/HEXO/source/_posts/features

i=1
for file in $fir/*.jpg
do
	mv $file ${i}.jpg
	i=$(($i+1))
done
