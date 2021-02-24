Total=0
Running=0
Free=0
Error=0

data=$(scontrol show job | grep -A 13 "UserId=*~*")

states=($((echo "$data") | grep 'JobState=' | awk '{print $1}' | sed 's/JobState=//g'))

numcpus=($((echo "$data") | grep 'NumCPUs=' | awk '{print $2}' | sed 's/NumCPUs=//g'))


len=`expr ${#states[@]} - 1`
for index in `seq 0 $len`
do
  if [ ${states[$index]} = 'RUNNING' ]; then Running=`expr ${numcpus[$index]} + $Running`; fi
  if [ ${states[$index]} = 'PENDING' ]; then Free=`expr ${numcpus[$index]} + $Free`; fi
done

Total=`expr $Running + $Free`
echo 'Total - Running - Free - Error'
echo "$Total - $Running - $Free - $Error"