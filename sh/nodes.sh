output=$(scontrol show job | grep -A 3 "UserId=*~*" | grep 'JobState=' | awk '{print $1}' | sed 's/JobState=//g')
Total=0
Running=0
Free=0
Error=0
for item in $output
do
  if [ $item = 'RUNNING' ]; then Running=`expr $Running + 1`; fi
  if [ $item = 'PENDING' ]; then Free=`expr $Free + 1`; fi
  Total=`expr $Total + 1`
done
echo 'Total - Running - Free - Error'
echo "$Total - $Running - $Free - $Error"