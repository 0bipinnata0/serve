selectData=$(scontrol show job | grep -A 25 -B 1 'UserId=*~*')
squeue=$(squeue)

id="JobId"
location="WorkDir"
user="UserId"
spend_time="StartTime"
status="JobState"

idArr=()
locationArr=()
userArr=()
spendTimeArr=()
statusArr=()
createTimeArr=()

selectData=($(echo $selectData))

index=0

for item in ${selectData[@]}
do
 if [[ $item == *$id* ]];
  then 
    target=$(echo $item | sed 's/JobId=//g');
    createTimeArr[$index]=$(echo "$squeue" | grep $target | awk '{print $6}')
    idArr[$index]=$target
  fi
 if [[ $item == *$user* ]]; then userArr[$index]=$(echo $item| sed 's/UserId=//g'| sed 's/(.*$//g'); fi
 if [[ $item == *$spend_time* ]]; then spendTimeArr[$index]=$(echo $item| sed 's/StartTime=//g' | sed 's/T/ /g'); fi
 if [[ $item == *$status* ]];
 then
 target=$(echo $item| sed 's/JobState=//g');
  statusArr[$index]='2'
  if [ $target == 'RUNNING' ]; then statusArr[$index]='0'; fi
  if [ $target == 'PENDING' ]; then statusArr[$index]='1'; fi
 fi
 if [[ $item == *$location* ]]; then locationArr[$index]=$(echo $item| sed 's/WorkDir=//g');index=`expr $index + 1`; fi
done


len=`expr ${#idArr[@]} - 1`
for i in `seq 0 $len`
do
  echo "${idArr[$i]}**${locationArr[$i]}**${userArr[$i]}**${createTimeArr[$i]}**${statusArr[$i]}**${spendTimeArr[$i]}"
done