nowYear=$(date +%Y)'-01-01'
month=$(date +%Y-%m)'-01'
lastmonth=$(date -d last-month +%Y-%m)'-01'

user=*~*

used=$(sreport Cluster UserUtilizationByAccount user=$user start=$month end=now | sed -n '7p' | awk '{print  $(NF-1)}')
lastUsed=$(sreport Cluster UserUtilizationByAccount user=$user start=$lastmonth end=$month | sed -n '7p' | awk '{print  $(NF-1)}')
totalUsed=$(sreport Cluster UserUtilizationByAccount user=$user start=$nowYear end=now | sed -n '7p' | awk '{print  $(NF-1)}')

echo $user-$used-$lastUsed-$totalUsed