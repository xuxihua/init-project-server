const mongoose = require('mongoose').set('debug', true);

const db_info = {
    servername: "localhost",
    DATABASE: "xixi_customize",
    port: 27017,
    user: "",
    pass: ""
  }
const options = {
	autoReconnect: true,
	useNewUrlParser: true,
	useUnifiedTopology: true
}

const url = `mongodb://${db_info.servername}:${db_info.port}/${db_info.DATABASE}`

module.exports = {
	connect: ()=> {
		mongoose.connect(url,options)
		let db = mongoose.connection
		db.on('error', console.error.bind(console, '连接错误:'));
		db.once('open', ()=> {
			console.log('mongodb connect success');
		})
	}
}
