var apiResponder = require("./Helpers/apiresponder.js");

function post_confirm(params) {
	const REQ = params;
	_service = Service.find(id);
	
	if(!_service){
		return apiResponder.Error(3);
	}

	if(_service.status_id == '6'){
		return apiResponder.Error(2);
	}

	if(!_service.driver_id && _service.status_id == '1'){

			_service = Service.update(REQ.service_id, { driver_id: REQ.driver_id, status_id: '2'});
			Driver.update(REQ.driver_id, { available: '0' });
			
			driverTmp = Driver.find(REQ.driver_id);

			Service.update(REQ.service_id, { 
				 	car_id: driverTmp.car_id 
					//Up carro
					//, pwd: md5(params.pwd)
				 });

			//Notificar a usuario!!

			var pushMessage = "Tu servicio ha sido confirmado!";

			/* servicio = Service.find(id);

			push = Push.make();

			if (servicio.user.type == '1') {//iPhone

			pushAns = push.ios(servicio.user.uuid, pushMessage);

			} else {

			pushAns = push.android2(servicio.user.uuid, pushMessage);

			} */

			var push = Push.make();

			if (_service.user.uuid == '') {
				return  apiResponder.Error(0);
			}

			if (_service.user.type == '1') {
				//iPhone
				push.ios(_service.user.uuid, pushMessage, 1, 'honk.wav', 'Open', {service_id: _service.id});
				return;
			} else {
				push.android2(_service.user.uuid, pushMessage, 1, 'default', 'Open', {service_id: _service.id});
				return;
			}

			return  apiResponder.Error(0);

		} else {
			return  apiResponder.Error(0);
		}
};




