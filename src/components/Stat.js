import _ from 'lodash'
import moment from 'moment'

const getData = (reportList,chartDay) => {
    const listBaru = []
    reportList.map(rl => {
      const { type, credit_debit, amount, status, updated_at } = rl
      listBaru.push({ type, credit_debit, amount, status, updated_at })
    })
    listBaru.reverse()
    const listBaru2 = []
    const listBaru3 = []
    const listBaru4 = []

    //console.log(`listbaru original : ${JSON.stringify(listBaru)}`)

    listBaru.map((lb, i) => {
      const mult = lb.credit_debit == 'CREDIT' ? 1 : -1

      if (i == 0) {
        const balance = lb.amount * mult
        listBaru2.push({ ...lb, balance })
        listBaru3.push({ ...lb, balance })
      } else {
        const balance = listBaru2[i - 1].balance + lb.amount * mult
        listBaru2.push({ ...lb, balance })

        if (lb.type != "Fee Account Transfer") {
          listBaru3.push({ ...lb, balance })
        }
      }

    })

    //console.log(`gabungan ke-3 yang mengasyikkan ${JSON.stringify(listBaru3)}`)

    listBaru3.map(lb3 => {
      const { updated_at, balance } = lb3
      listBaru4.push({ updated_at, balance })
    })
    //console.log(`gabungan ke-4 yang mengasyikkan ${JSON.stringify(listBaru4)}`)

    const listBaru6 = _.values(_.groupBy(listBaru4, (dt) => moment(dt.updated_at).dayOfYear()))
    //console.log(`gabungan ke-6 yang mengasyikkan ${JSON.stringify(listBaru6)}`)
    const listBaru7 = []
    const listBaru8 = []

    listBaru6.map(l => {
      listBaru7.push(l[l.length - 1].balance)
      //listBaru8.push({ ...l[0] })  ///// kalau nak include duit first masuk awal awal hari tu
      listBaru8.push({ ...l[l.length - 1] })
    })
    //console.log(`gabungan ke-7 yang mengasyikkan ${JSON.stringify(listBaru7)}`)
    //console.log(`gabungan ke-8 yang mengasyikkan ${JSON.stringify(listBaru8)}`)
    //listBaru7&&setChartData(listBaru7)

    /////////TESTING DATE
    var days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
    var goBackDays = chartDay;

    var today = new Date(moment().add(1, 'days')); // temporary get date ahead one day, to remove later 

    var daysSorted = [];

    for (var i = 0; i < goBackDays; i++) {
      var newDate = new Date(today.setDate(today.getDate() - 1));
      daysSorted.push({ day: days[newDate.getDay()], date: newDate });
    }
    const listBaru9 = []

    /////////END TESTING DATE
    daysSorted.map(ds => {
      const adaEntry = listBaru8.find(lb8 => moment(lb8.updated_at).isSame(moment(new Date(ds.date)), 'day'))
      adaEntry ? listBaru9.push({ ...adaEntry, day: ds.day }) : listBaru9.push({ update: moment(new Date(ds.date)), ada: 'takde', day: ds.day })

    })


    const last = listBaru9[listBaru9.length - 1]
    //console.log(`last ialah ${JSON.stringify(last)}`)

    if (last.ada == 'takde') {

      const start = listBaru8.find(n => moment(n.updated_at) < moment(last.update)) || listBaru6.find(n => moment(n.updated_at) < moment(last.update))

      //console.log(`start ialah : ${JSON.stringify(start)}`)
      listBaru9[listBaru9.length - 1].balance = _.isArray(start) ? start[start.length - 1].balance : 0
    }
    //console.log(` gabungan ke-9 yang mengasyikkan ${JSON.stringify(listBaru9)}`);
    const listBaru10 = []
    listBaru9.reverse()
    listBaru9.map((lb9, i) => {
      const { updated_at, balance, ada } = lb9
      if (!ada) {
        listBaru10.push(lb9)
      } else {
        const newBalance = i > 0 ? listBaru10[i - 1].balance : lb9.balance
        //console.log(`new balance ialah : ${newBalance}`)
        listBaru10.push({ ...lb9, balance: newBalance })

      }
    })

    //console.log(` gabungan ke-10 yang mengasyikkan ${JSON.stringify(listBaru10)}`);
    const listBaru11 = []
    //const i = goBackDays
    //ni kalau bahagi 30
    if (chartDay === 30) {
      for (i = goBackDays; i > 0; i--) {
        !((i + 1) % 3 === 0) && listBaru10.splice(i, 1);
        //console.log(JSON.stringify((i + 1) % 3 === 0))
      }
      //console.log(` gabungan ke-11 yang mengasyikkan ${JSON.stringify(listBaru10)}`);
      return listBaru10
    }

    return listBaru10

  }

export default getData