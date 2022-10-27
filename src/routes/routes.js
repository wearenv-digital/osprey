const express = require('express');
var router = express.Router();
const controllers = require('../controller/controllers');

router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', (req, res) => {
	res.render('index', {
		title: 'Page Title',
		breadcrumbs: req.breadcrumbs
	});
});

router.get('/data-test', async (req, res) => {
	let results;
	let nameArray = [];
	let codeArray = [];
	let newObj = {};

	results = await controllers.getNames();
	// res.send(results);
	// return

	//  dont lose //
	let newArr = [];
	results.forEach(element => {
		nameArray.push(element.product_name);
		codeArray.push(element.product_code);
		newObj.name = nameArray;
		newObj.code = codeArray;
	});
	// res.send(newObj);
	// return;
	// res.send(name[]Array);

	res.render('test-product-list', {
		data: results
	});
});

router.get('/product-page', async (req, res) => {
	try {
		let results = await controllers.getAll();
		res.json(results);
	} catch (e) {
		console.log(e);
		return res.sendStatus(500);
	}
});

router.get('/product-page/:product_code', async (req, res) => {
	try {
		var camInfo = {};
		var camFeatures = {};
		var camSpecs = {};
		var audioVideo = {};
		var automation = {};
		var elecPhys = {};
		var description = {};

		camInfo = await controllers.getInfo(req);
		camFeatures = await controllers.getFeatures(req);
		camSpecs = await controllers.getCamSpecs(req);
		audioVideo = await controllers.getAudioVideo(req);
		automation = await controllers.getAutomation(req);
		elecPhys = await controllers.getElecPhys(req);
		description = await controllers.getDesc(req);

		camFeatures = controllers.removeFirst(camFeatures);
		camSpecs = controllers.removeFirst(camSpecs);
		audioVideo = controllers.removeFirst(audioVideo);
		automation = controllers.removeFirst(automation);
		elecPhys = controllers.removeFirst(elecPhys);

		var description = description[0];
		camInfo = camInfo[0];
		camFeatures = camFeatures[0];
		camSpecs = camSpecs[0];
		audioVideo = audioVideo[0];
		automation = automation[0];
		elecPhys = elecPhys[0];

		var allInfoKeys = controllers.listAllKeys(camInfo);
		var allFeatureKeys = controllers.listAllKeys(camFeatures);
		var allAvKeys = controllers.listAllKeys(audioVideo);
		var allSpecsKeys = controllers.listAllKeys(camSpecs);
		var allAutoKeys = controllers.listAllKeys(automation);
		var allElecKeys = controllers.listAllKeys(elecPhys);

		var deadInfoKeys = controllers.filterDead(camInfo);
		var deadFeaturekeys = controllers.filterDead(camFeatures);
		var deadSpecsKeys = controllers.filterDead(camSpecs);
		var deadAvKeys = controllers.filterDead(audioVideo);
		var deadAutoKeys = controllers.filterDead(automation);
		var deadElecKeys = controllers.filterDead(elecPhys);

		var allInfoVals = controllers.listAllVals(camInfo);
		var allFeaturesVals = controllers.listAllVals(camFeatures);
		var allSpecsVals = controllers.listAllVals(camSpecs);
		var allAvVals = controllers.listAllVals(audioVideo);
		var allAutoVals = controllers.listAllVals(automation);
		var allElecVals = controllers.listAllVals(elecPhys);

		var newInfoKeys = [];
		var newFeaturesKeys = [];
		var newSpecsKeys = [];
		var newAvKeys = [];
		var newAutoKeys = [];
		var newElecKeys = [];

		newInfoKeys = allInfoKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadInfoKeys.length; i++) {
				if (value === deadInfoKeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newFeaturesKeys = allFeatureKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadFeaturekeys.length; i++) {
				if (value === deadFeaturekeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newSpecsKeys = allSpecsKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadSpecsKeys.length; i++) {
				if (value === deadSpecsKeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newAvKeys = allAvKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadAvKeys.length; i++) {
				if (value === deadAvKeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newAutoKeys = allAutoKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadAutoKeys.length; i++) {
				if (value === deadAutoKeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newElecKeys = allElecKeys.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadElecKeys.length; i++) {
				if (value === deadElecKeys[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		var newInfoVals = [];
		var newFeaturesVals = [];
		var newSpecsVals = [];
		var newAvVals = [];
		var newAutoVals = [];
		var newElecVals = [];
		const deadVals = ['*', 'n/a', ''];

		newInfoVals = allInfoVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		newFeaturesVals = allFeaturesVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		// Get good specs values by comparing to deadVals
		newSpecsVals = allSpecsVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		// get good AV Values by comparing to deadVal

		newAvVals = allAvVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		// Get good automation values by cmparing to deadVals

		newAutoVals = allAutoVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		// Get good ElecPhys values by comparing to deadVals

		newElecVals = allElecVals.reduce(function (prev, value) {
			var isDuplicate = false;
			for (var i = 0; i < deadVals.length; i++) {
				if (value === deadVals[i]) {
					isDuplicate = true;
					break;
				}
			}
			if (!isDuplicate) {
				prev.push(value);
			}
			return prev;
		}, []);

		var finalInfo = {};
		var finalSpecs = {};
		var finalFeatures = {};
		var finalAv = {};
		var finalAutomation = {};
		var finalElecPhys = {};

		function finalObjCreator(newKeys, newVals) {
			var obj = {};
			obj = newKeys.forEach((key, index) => {
				obj[key] = newVals[index];
			});
			return obj;
		}
		// Object.fromEntries(arr1.map((a, i) => [a, arr2[i]]));

		finalAv = Object.fromEntries(newAvKeys.map((a, i) => [a, newAvVals[i]]));
		finalSpecs = Object.fromEntries(
			newSpecsKeys.map((a, i) => [a, newSpecsVals[i]])
		);
		finalFeatures = Object.fromEntries(
			newFeaturesKeys.map((a, i) => [a, newFeaturesVals[i]])
		);
		finalInfo = Object.fromEntries(newInfoKeys.map((a, i) => [a, newInfoVals[i]]));
		finalAutomation = Object.fromEntries(
			newAutoKeys.map((a, i) => [a, newAutoVals[i]])
		);
		finalElecPhys = Object.fromEntries(
			newElecKeys.map((a, i) => [a, newElecVals[i]])
		);

		// res.send(finalElecPhys);
		// res.send(finalAv)
		// res.send(finalSpecs)

		var finalObj = {};

		finalObj.features = finalFeatures;
		finalObj.info = finalInfo;
		finalObj.specs = finalSpecs;
		finalObj.av = finalAv;
		finalObj.automation = finalAutomation;
		finalObj.elecPhys = finalElecPhys;

		// res.send(finalInfo)
		// return;

		var finalArr = [];
		finalArr.push(finalFeatures);
		finalArr.push(finalInfo);
		finalArr.push(finalAv);
		finalArr.push(finalAutomation);
		finalArr.push(finalElecPhys);

		description = Object.values(description);

		var data = {};

		data = {
			features: finalFeatures,
			dataObj: finalObj,
			dataArr: finalArr,
			description: description
		};

		data.product_code = finalObj.info.product_code;
		// res.send(data);
		// return
		res.render('product-page-with-partials', {
			features: newFeaturesVals,
			description: description,
			data: data,
			specs: finalSpecs,
			av: finalAv,
			auto: finalAutomation,
			elecPhys: finalElecPhys,
			info: finalInfo
		});
		return;
	} catch (e) {
		console.log(e);
		return res.render('index.ejs');
	}
});

router.get('/layout', (req, res) => {
	res.render('layout');
});

router.get('/docker-test', (req, res) => {
	res.send('<h1>WORKING  </h1>');
});

router.get('/about', (req, res) => {
	res.render('about');
});

router.get('/marine', (req, res) => {
	res.render('marine');
});

router.get('/law-enforcement', (req, res) => {
	res.render('law');
});

router.get('/parking', (req, res) => {
	res.render('parking');
});

router.get('/security', (req, res) => {
	res.render('security');
});

router.get('/product-category', (req, res) => {
	res.render('product-category');
});

// CCTV categories
//
//
//

router.get('/products/cctv', (req, res) => {
	res.render('cctv');
});

router.get('/products/cctv/cameras', (req, res) => {
	res.render('cameras');
});

router.get('/products/cctv/camera-housings', (req, res) => {
	res.render('camera-housings');
});

router.get('/products/cctv/cctv-transmission', (req, res) => {
	res.render('cctv-transmission');
});

router.get('/products/cctv/cctv-recording', (req, res) => {
	res.render('cctv-recording');
});

router.get('/products/cctv/cctv-analytics', (req, res) => {
	res.render('cctv-analytics');
});

router.get('/products/cctv/cctv-ancillaries', (req, res) => {
	res.render('cctv-ancillaries');
});

router.get('/products/cctv/security-management-software', (req, res) => {
	res.render('management-software');
});

//  Marine Category Route

router.get('/marine-categories', (req, res) => {
	res.render('marine-categories');
});

//
//
//
//
// camera categories routes
//
//
//
//
//

router.get('/products/cctv/cameras/', (req, res) => {
	res.render('cameras');
});

router.get('/products/cctv/cameras/prison-cell', (req, res) => {
	res.render('prison-cell');
});

router.get('/products/cctv/cameras/marine-cameras', (req, res) => {
	res.render('marine-cameras');
});

router.get('/products/cctv/cameras/hazardous-enviornment', (req, res) => {
	res.render('hazardous-environment');
});

router.get('/products/cctv/cameras/thermal-cameras', (req, res) => {
	res.render('thermal-cameras');
});

router.get('/products/cctv/cameras/commercial', (req, res) => {
	res.render('commercial-cameras');
});

//
//
//
//

router.get('/products/camera-collection', (req, res) => {
	res.render('cameras-collection');
});

router.get('/products/access-control', (req, res) => {
	res.render('access');
});

// READERS COLLECTION
router.get('/products/access-control/readers', (req, res) => {
	res.render('readers-collection');
});

// READERS CATERGORY PAGES
router.get('/products/access-control/readers/proximity-readers', (req, res) => {
	res.render('proximity-readers');
});

router.get('/products/access-control/readers/qr', (req, res) => {
	res.render('qr-readers');
});

router.get('/products/access-control/readers/bluetooth-readers', (req, res) => {
	res.render('bluetooth-readers');
});

router.get('/products/access-control/readers/poe-readers', (req, res) => {
	res.render('poe-readers');
});

router.get('/products/access-control/readers/fingerprint-readers', (req, res) => {
	res.render('fingerprint-readers');
});

router.get('/products/access-control/readers/pin-keypad-readers', (req, res) => {
	res.render('pin-keypad-readers');
});

router.get(
	'/products/access-control/readers/universal-proximity-readers',
	(req, res) => {
		res.render('universal-proximity');
	}
);

router.get(
	'/products/access-control/readers/facial-recognition-readers',
	(req, res) => {
		res.render('facial-recognition-readers');
	}
);

router.get('/products/access-control/door-controllers', (req, res) => {
	res.render('door-controllers-collection');
});

router.get('/products/access-control/wireless-locks', (req, res) => {
	res.render('wireless-locks');
});

// router.get('/products/access-control/wireless-locks', (req, res) => {
// 	res.render('wireless-locks');
// });

router.get('/products/access-control/access-control-software', (req, res) => {
	res.render('access-control-software-collection');
});

router.get('/products/access-control/anpr', (req, res) => {
	res.render('anpr');
});

router.get('/products/access-control/anpr/anpr-cameras', (req, res) => {
	res.render('anpr-cameras');
});

router.get('/products/access-control/anpr/anpr-software', (req, res) => {
	res.render('anpr-software');
});

router.get('/products/access-control/anpr/anpr-signage', (req, res) => {
	res.render('anpr-signage');
});

router.get('/products/access-control/anpr/vehicle-counting', (req, res) => {
	res.render('vehicle-counting');
});

router.get('/products/interview-recorders', (req, res) => {
	res.render('interview-recorders');
});

router.get('/products/visitor-management', (req, res) => {
	res.render('visitor-management');
});

router.get('/products/panic-alarms', (req, res) => {
	res.render('panic-alarms');
});

router.get('/contact', (req, res) => {
	res.render('contact');
});

router.get('/frequently-asked', (req, res) => {
	res.render('faq');
});

router.get('/sell', (req, res) => {
	res.render('sell');
});

router.get('/terms-conditions', (req, res) => {
	res.render('terms');
});

router.get('/services', (req, res) => {
	res.render('services-collection');
});

router.get('/services/system-design', (req, res) => {
	res.render('system-design-build');
});

router.get('/services/service-support', (req, res) => {
	res.render('service-support');
});

router.get('/services/installations', (req, res) => {
	res.render('installations');
});

router.get('/services/cctv-alarm-monitoring', (req, res) => {
	res.render('cctv-alarm-monitoring');
});

router.get('/services/training', (req, res) => {
	res.render('training');
});

router.get('/services/consultancy', (req, res) => {
	res.render('consultancy');
});

router.get('/services/risk', (req, res) => {
	res.render('risk-assessment');
});

router.get('/services/risk/security-risk', (req, res) => {
	res.render('security-risk');
});

router.get('/services/risk/fire-risk', (req, res) => {
	res.render('fire-risk');
});

router.get('/services/site-maintenance', (req, res) => {
	res.render('site-maintenance');
});

// resources routes

router.get('/resources', (req, res) => {
	res.render('resources');
});

router.get('/resources/datasheets', (req, res) => {
	res.render('datasheets');
});

router.get('/resources/gallery', (req, res) => {
	res.render('gallery');
});

router.get('/resources/knowledge', (req, res) => {
	res.render('knowledge-centre');
});

router.get('/resources/tools', (req, res) => {
	res.render('tools');
});

router.get('/resources/press', (req, res) => {
	res.render('press');
});

module.exports = router;
