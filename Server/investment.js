let cassandra = require('cassandra-driver');

exports.AddInvestment=(req,res)=>{
    if (req.body.InvestedAmount === 0) {
        return res.status(400).json({ body: 'Investment should be greater than zero' });
      }
    const newInvestment = {
        userId: req.body.userId,
        type:req.body.type,
        name:req.body.name,
        units:req.body.units,
        InvestedAmount:req.body.InvestedAmount,
    };
    String.prototype.format = function() {
        var formatted = this;
        for (var i = 0; i < arguments.length; i++) {
            var regexp = new RegExp('\\{'+i+'\\}', 'gi');
            formatted = formatted.replace(regexp, arguments[i]);
        }
        return formatted;
    };
    let authProvider = new cassandra.auth.PlainTextAuthProvider('cassandra', 'cassandra');
    let contactPoints = ['127.0.0.1'];
    let localDataCenter = 'datacenter1';
    let client = new cassandra.Client({contactPoints: contactPoints, authProvider: authProvider, localDataCenter: localDataCenter, keyspace:'investmenttracker'});
    let userId = 'vinyas';
    let temp = 'IDFC';
    let query = 'UPDATE Investments SET indianStocks = indianStocks + {{name: \'IDFC\', units:1, investedAmount:50}} WHERE userId=\'vinyas\';';
    console.log(query);
    //let query = 'UPDATE Investments SET indianStocks = indianStocks + {{name: {0}, units:?, investedAmount:?}} WHERE userId=?;'.format(temp);
    const params = [];
    client.execute(query, params)
    .then(result => {
        console.log('Row updated on the cluster');
        return res.json({'status':'success'});
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ error: 'something went wrong' });
      });
}