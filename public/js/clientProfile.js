/* eslint-disable no-undef */
$(document).ready(async () => {
	var file = undefined;
	$('#cancel').on('click', ()=> {
		if(document.referrer.indexOf('clientSchedule') > 0 || document.referrer.indexOf('clientHome') > 0 ){
			parent.history.back();
		} else {
			window.location.href = '/clientHome';
		}
	});
	
	const clientProfile = await fetch('/clients/myProfile',{
		method: 'GET', 
		mode: 'cors', // no-cors, *cors, same-origin
		cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
		credentials: 'same-origin', // include, *same-origin, omit
		redirect: 'follow', // manual, *follow, error
		referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
	});
	if(clientProfile.status === 200){
		clientProfile.json().then((data)=>{
			$('#name').text(data.name);
			$('#email').text(data.email);
			$('#gender').text(data.gender);
			$('#birthdate').text(moment(data.birthDate).format('YYYY-MM-DD'));
			$('#country').text(data.country);
			$('#height').text(data.height);
			$('#weight').text(data.weight);
			if(data.profilePic != undefined)
				$('#profile-img').attr('src', `data:image/png;base64,${data.profilePic}`);
			else 
				$('#profile-img').attr('src', '/images/default-pp.png');
		});	
	}

	var formData = new FormData();
	$('#SaveChanges').on('click', async () => {
		formData.append('upload', file);
		formData.append('name', $('#name').text());
		formData.append('country', $('#country').text());
		formData.append('gender', $('#gender').text());
		formData.append('weight', parseInt($('#weight').text()) );
		formData.append('height', parseInt($('#height').text()));
		formData.append('birthDate', moment($('#birthdate').text()).format('YYYY-MM-DD'));
		
		var saveChanges = await fetch('/client/editProfile', {
			method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			body: formData
		});
		if (saveChanges.status === 200) {
			formData.delete('upload');
			formData.delete('name');
			formData.delete('country');
			formData.delete('gender');
			formData.delete('weight');
			formData.delete('height');
			formData.delete('birthDate');
			if (document.referrer.indexOf('clientSchedule') > 0 || document.referrer.indexOf('clientHome') > 0) {
				parent.history.back();
			} else {
				window.location.href = '/coachHome';
			}
		}
		else {
			saveChanges.json().then((data)=>{
				console.log(data);
			});
		}
		
	});

	$('#profile-img').click(async () => {
		$('#img-upload').click();
	});

	$('#edit-text').click(async () => {
		$('#img-upload').click();
	});
	// let temp = false;
	$('#img-upload').change(function () {
		$('#profile-img').attr('src', window.URL.createObjectURL(this.files[0]));
		file = this.files[0];
	});
    
	$('#name-edit').click(async () => {
		var input = $('<input />', {
			'id':'name',
			'type': 'text',
			'class': 'clientProfile-user-info-item-text',
			'value': $('#name').text()
		});
		$('#name').replaceWith(input);
		$('#name-save-btn').css('display','flex');
		$('#name-edit').css('display','none');
	});
    
	$('#name-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'name',
			class: 'clientProfile-user-info-item-text',
			text: $('#name').val()
		});
		$('#name').replaceWith(mydiv);
		$('#name-save-btn').css('display','none');
		$('#name-edit').css('display','flex');
	});
    
	$('#gender-edit').click(async () => {
		var select = $('<select />', {
			'id':'gender',
			'class': 'clientProfile-user-info-item-text',
		});
		select.append('<option value="" disabled hidden selected>'+ $('#gender').text() +'</option>');
		select.append('<option>Male</option>');
		select.append('<option>Female</option>');
		select.append('<option>Other</option>');
		$('#gender').replaceWith(select);
		$('#gender-save-btn').css('display','flex');
		$('#gender-edit').css('display','none');
	});
    
	$('#gender-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'gender',
			class: 'clientProfile-user-info-item-text',
			text: $('#gender option:selected').text()
		});
		$('#gender').replaceWith(mydiv);
		$('#gender-save-btn').css('display','none');
		$('#gender-edit').css('display','flex');
	});
    
	$('#birthdate-edit').click(async () => {
		var input = $('<input />', {
			'id':'birthdate',
			'type': 'date',
			'class': 'clientProfile-user-info-item-text',
			'value': $('#birthdate').text()
		});
		$('#birthdate').replaceWith(input);
		$('#birthdate-save-btn').css('display','flex');
		$('#birthdate-edit').css('display','none');
	});
    
	$('#birthdate-save-btn').click(async () => {
		console.log($('#birthdate').val());
		var mydiv = $('<div />', {
			id: 'birthdate',
			class: 'clientProfile-user-info-item-text',
			text: $('#birthdate').val()
		});
		$('#birthdate').replaceWith(mydiv);
		$('#birthdate-save-btn').css('display','none');
		$('#birthdate-edit').css('display','flex');
	});
    
	$('#country-edit').click(async () => {
		var select = $('<select />', {
			'id':'country',
			'class': 'clientProfile-user-info-item-text',
		});
		select.append('<option value="" disabled hidden selected>' + $('#country').text() + '</option>',
			'<option value="Afganistan">Afghanistan</option>',
			'<option value="Albania">Albania</option>',
			'<option value="Algeria">Algeria</option>',
			'<option value="American Samoa">American Samoa</option>',
			'<option value="Andorra">Andorra</option>',
			'<option value="Angola">Angola</option>',
			'<option value="Anguilla">Anguilla</option>',
			'<option value="Antigua & Barbuda">Antigua & Barbuda</option>',
			'<option value="Argentina">Argentina</option>',
			'<option value="Armenia">Armenia</option>',
			'<option value="Aruba">Aruba</option>',
			'<option value="Australia">Australia</option>',
			'<option value="Austria">Austria</option>',
			'<option value="Azerbaijan">Azerbaijan</option>',
			'<option value="Bahamas">Bahamas</option>',
			'<option value="Bahrain">Bahrain</option>',
			'<option value="Bangladesh">Bangladesh</option>',
			'<option value="Barbados">Barbados</option>',
			'<option value="Belarus">Belarus</option>',
			'<option value="Belgium">Belgium</option>',
			'<option value="Belize">Belize</option>',
			'<option value="Benin">Benin</option>',
			'<option value="Bermuda">Bermuda</option>',
			'<option value="Bhutan">Bhutan</option>',
			'<option value="Bolivia">Bolivia</option>',
			'<option value="Bonaire">Bonaire</option>',
			'<option value="Bosnia & Herzegovina">Bosnia & Herzegovina</option>',
			'<option value="Botswana">Botswana</option>',
			'<option value="Brazil">Brazil</option>',
			'<option value="British Indian Ocean Ter">British Indian Ocean Ter</option>',
			'<option value="Brunei">Brunei</option>',
			'<option value="Bulgaria">Bulgaria</option>',
			'<option value="Burkina Faso">Burkina Faso</option>',
			'<option value="Burundi">Burundi</option>',
			'<option value="Cambodia">Cambodia</option>',
			'<option value="Cameroon">Cameroon</option>',
			'<option value="Canada">Canada</option>',
			'<option value="Canary Islands">Canary Islands</option>',
			'<option value="Cape Verde">Cape Verde</option>',
			'<option value="Cayman Islands">Cayman Islands</option>',
			'<option value="Central African Republic">Central African Republic</option>',
			'<option value="Chad">Chad</option>',
			'<option value="Channel Islands">Channel Islands</option>',
			'<option value="Chile">Chile</option>',
			'<option value="China">China</option>',
			'<option value="Christmas Island">Christmas Island</option>',
			'<option value="Cocos Island">Cocos Island</option>',
			'<option value="Colombia">Colombia</option>',
			'<option value="Comoros">Comoros</option>',
			'<option value="Congo">Congo</option>',
			'<option value="Cook Islands">Cook Islands</option>',
			'<option value="Costa Rica">Costa Rica</option>',
			'<option value="Cote DIvoire">Cote DIvoire</option>',
			'<option value="Croatia">Croatia</option>',
			'<option value="Cuba">Cuba</option>',
			'<option value="Curaco">Curacao</option>',
			'<option value="Cyprus">Cyprus</option>',
			'<option value="Czech Republic">Czech Republic</option>',
			'<option value="Denmark">Denmark</option>',
			'<option value="Djibouti">Djibouti</option>',
			'<option value="Dominica">Dominica</option>',
			'<option value="Dominican Republic">Dominican Republic</option>',
			'<option value="East Timor">East Timor</option>',
			'<option value="Ecuador">Ecuador</option>',
			'<option value="Egypt">Egypt</option>',
			'<option value="El Salvador">El Salvador</option>',
			'<option value="Equatorial Guinea">Equatorial Guinea</option>',
			'<option value="Eritrea">Eritrea</option>',
			'<option value="Estonia">Estonia</option>',
			'<option value="Ethiopia">Ethiopia</option>',
			'<option value="Falkland Islands">Falkland Islands</option>',
			'<option value="Faroe Islands">Faroe Islands</option>',
			'<option value="Fiji">Fiji</option>',
			'<option value="Finland">Finland</option>',
			'<option value="France">France</option>',
			'<option value="French Guiana">French Guiana</option>',
			'<option value="French Polynesia">French Polynesia</option>',
			'<option value="French Southern Ter">French Southern Ter</option>',
			'<option value="Gabon">Gabon</option>',
			'<option value="Gambia">Gambia</option>',
			'<option value="Georgia">Georgia</option>',
			'<option value="Germany">Germany</option>',
			'<option value="Ghana">Ghana</option>',
			'<option value="Gibraltar">Gibraltar</option>',
			'<option value="Great Britain">Great Britain</option>',
			'<option value="Greece">Greece</option>',
			'<option value="Greenland">Greenland</option>',
			'<option value="Grenada">Grenada</option>',
			'<option value="Guadeloupe">Guadeloupe</option>',
			'<option value="Guam">Guam</option>',
			'<option value="Guatemala">Guatemala</option>',
			'<option value="Guinea">Guinea</option>',
			'<option value="Guyana">Guyana</option>',
			'<option value="Haiti">Haiti</option>',
			'<option value="Hawaii">Hawaii</option>',
			'<option value="Honduras">Honduras</option>',
			'<option value="Hong Kong">Hong Kong</option>',
			'<option value="Hungary">Hungary</option>',
			'<option value="Iceland">Iceland</option>',
			'<option value="Indonesia">Indonesia</option>',
			'<option value="India">India</option>',
			'<option value="Iran">Iran</option>',
			'<option value="Iraq">Iraq</option>',
			'<option value="Ireland">Ireland</option>',
			'<option value="Isle of Man">Isle of Man</option>',
			'<option value="Israel">Israel</option>',
			'<option value="Italy">Italy</option>',
			'<option value="Jamaica">Jamaica</option>',
			'<option value="Japan">Japan</option>',
			'<option value="Jordan">Jordan</option>',
			'<option value="Kazakhstan">Kazakhstan</option>',
			'<option value="Kenya">Kenya</option>',
			'<option value="Kiribati">Kiribati</option>',
			'<option value="Korea North">Korea North</option>',
			'<option value="Korea Sout">Korea South</option>',
			'<option value="Kuwait">Kuwait</option>',
			'<option value="Kyrgyzstan">Kyrgyzstan</option>',
			'<option value="Laos">Laos</option>',
			'<option value="Latvia">Latvia</option>',
			'<option value="Lebanon">Lebanon</option>',
			'<option value="Lesotho">Lesotho</option>',
			'<option value="Liberia">Liberia</option>',
			'<option value="Libya">Libya</option>',
			'<option value="Liechtenstein">Liechtenstein</option>',
			'<option value="Lithuania">Lithuania</option>',
			'<option value="Luxembourg">Luxembourg</option>',
			'<option value="Macau">Macau</option>',
			'<option value="Macedonia">Macedonia</option>',
			'<option value="Madagascar">Madagascar</option>',
			'<option value="Malaysia">Malaysia</option>',
			'<option value="Malawi">Malawi</option>',
			'<option value="Maldives">Maldives</option>',
			'<option value="Mali">Mali</option>',
			'<option value="Malta">Malta</option>',
			'<option value="Marshall Islands">Marshall Islands</option>',
			'<option value="Martinique">Martinique</option>',
			'<option value="Mauritania">Mauritania</option>',
			'<option value="Mauritius">Mauritius</option>',
			'<option value="Mayotte">Mayotte</option>',
			'<option value="Mexico">Mexico</option>',
			'<option value="Midway Islands">Midway Islands</option>',
			'<option value="Moldova">Moldova</option>',
			'<option value="Monaco">Monaco</option>',
			'<option value="Mongolia">Mongolia</option>',
			'<option value="Montserrat">Montserrat</option>',
			'<option value="Morocco">Morocco</option>',
			'<option value="Mozambique">Mozambique</option>',
			'<option value="Myanmar">Myanmar</option>',
			'<option value="Nambia">Nambia</option>',
			'<option value="Nauru">Nauru</option>',
			'<option value="Nepal">Nepal</option>',
			'<option value="Netherland Antilles">Netherland Antilles</option>',
			'<option value="Netherlands">Netherlands (Holland, Europe)</option>',
			'<option value="Nevis">Nevis</option>',
			'<option value="New Caledonia">New Caledonia</option>',
			'<option value="New Zealand">New Zealand</option>',
			'<option value="Nicaragua">Nicaragua</option>',
			'<option value="Niger">Niger</option>',
			'<option value="Nigeria">Nigeria</option>',
			'<option value="Niue">Niue</option>',
			'<option value="Norfolk Island">Norfolk Island</option>',
			'<option value="Norway">Norway</option>',
			'<option value="Oman">Oman</option>',
			'<option value="Pakistan">Pakistan</option>',
			'<option value="Palau Island">Palau Island</option>',
			'<option value="Palestine">Palestine</option>',
			'<option value="Panama">Panama</option>',
			'<option value="Papua New Guinea">Papua New Guinea</option>',
			'<option value="Paraguay">Paraguay</option>',
			'<option value="Peru">Peru</option>',
			'<option value="Phillipines">Philippines</option>',
			'<option value="Pitcairn Island">Pitcairn Island</option>',
			'<option value="Poland">Poland</option>',
			'<option value="Portugal">Portugal</option>',
			'<option value="Puerto Rico">Puerto Rico</option>',
			'<option value="Qatar">Qatar</option>',
			'<option value="Republic of Montenegro">Republic of Montenegro</option>',
			'<option value="Republic of Serbia">Republic of Serbia</option>',
			'<option value="Reunion">Reunion</option>',
			'<option value="Romania">Romania</option>',
			'<option value="Russia">Russia</option>',
			'<option value="Rwanda">Rwanda</option>',
			'<option value="St Barthelemy">St Barthelemy</option>',
			'<option value="St Eustatius">St Eustatius</option>',
			'<option value="St Helena">St Helena</option>',
			'<option value="St Kitts-Nevis">St Kitts-Nevis</option>',
			'<option value="St Lucia">St Lucia</option>',
			'<option value="St Maarten">St Maarten</option>',
			'<option value="St Pierre & Miquelon">St Pierre & Miquelon</option>',
			'<option value="St Vincent & Grenadines">St Vincent & Grenadines</option>',
			'<option value="Saipan">Saipan</option>',
			'<option value="Samoa">Samoa</option>',
			'<option value="Samoa American">Samoa American</option>',
			'<option value="San Marino">San Marino</option>',
			'<option value="Sao Tome & Principe">Sao Tome & Principe</option>',
			'<option value="Saudi Arabia">Saudi Arabia</option>',
			'<option value="Senegal">Senegal</option>',
			'<option value="Seychelles">Seychelles</option>',
			'<option value="Sierra Leone">Sierra Leone</option>',
			'<option value="Singapore">Singapore</option>',
			'<option value="Slovakia">Slovakia</option>',
			'<option value="Slovenia">Slovenia</option>',
			'<option value="Solomon Islands">Solomon Islands</option>',
			'<option value="Somalia">Somalia</option>',
			'<option value="South Africa">South Africa</option>',
			'<option value="Spain">Spain</option>',
			'<option value="Sri Lanka">Sri Lanka</option>',
			'<option value="Sudan">Sudan</option>',
			'<option value="Suriname">Suriname</option>',
			'<option value="Swaziland">Swaziland</option>',
			'<option value="Sweden">Sweden</option>',
			'<option value="Switzerland">Switzerland</option>',
			'<option value="Syria">Syria</option>',
			'<option value="Tahiti">Tahiti</option>',
			'<option value="Taiwan">Taiwan</option>',
			'<option value="Tajikistan">Tajikistan</option>',
			'<option value="Tanzania">Tanzania</option>',
			'<option value="Thailand">Thailand</option>',
			'<option value="Togo">Togo</option>',
			'<option value="Tokelau">Tokelau</option>',
			'<option value="Tonga">Tonga</option>',
			'<option value="Trinidad & Tobago">Trinidad & Tobago</option>',
			'<option value="Tunisia">Tunisia</option>',
			'<option value="Turkey">Turkey</option>',
			'<option value="Turkmenistan">Turkmenistan</option>',
			'<option value="Turks & Caicos Is">Turks & Caicos Is</option>',
			'<option value="Tuvalu">Tuvalu</option>',
			'<option value="Uganda">Uganda</option>',
			'<option value="United Kingdom">United Kingdom</option>',
			'<option value="Ukraine">Ukraine</option>',
			'<option value="United Arab Erimates">United Arab Emirates</option>',
			'<option value="United States of America">United States of America</option>',
			'<option value="Uraguay">Uruguay</option>',
			'<option value="Uzbekistan">Uzbekistan</option>',
			'<option value="Vanuatu">Vanuatu</option>',
			'<option value="Vatican City State">Vatican City State</option>',
			'<option value="Venezuela">Venezuela</option>',
			'<option value="Vietnam">Vietnam</option>',
			'<option value="Virgin Islands (Brit)">Virgin Islands (Brit)</option>',
			'<option value="Virgin Islands (USA)">Virgin Islands (USA)</option>',
			'<option value="Wake Island">Wake Island</option>',
			'<option value="Wallis & Futana Is">Wallis & Futana Is</option>',
			'<option value="Yemen">Yemen</option>',
			'<option value="Zaire">Zaire</option>',
			'<option value="Zambia">Zambia</option>',
			'<option value="Zimbabwe">Zimbabwe</option>');
		$('#country').replaceWith(select);
		$('#country-save-btn').css('display','flex');
		$('#country-edit').css('display','none');
	});
    
	$('#country-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'country',
			class: 'clientProfile-user-info-item-text',
			text: $('#country option:selected').text()
		});
		$('#country').replaceWith(mydiv);
		$('#country-save-btn').css('display','none');
		$('#country-edit').css('display','flex');
	});
    
	$('#height-edit').click(async () => {
		var input = $('<input />', {
			'id':'height',
			'type': 'number',
			'class': 'clientProfile-user-info-item-text',
			'value': parseInt($('#height').text()) 
		});
		$('#height').replaceWith(input);
		$('#height-save-btn').css('display','flex');
		$('#height-edit').css('display','none');
	});
    
	$('#height-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'height',
			class: 'clientProfile-user-info-item-text',
			text: $('#height').val() + ' Cm'
		});
		$('#height').replaceWith(mydiv);
		$('#height-save-btn').css('display','none');
		$('#height-edit').css('display','flex');
	});
    
	$('#weight-edit').click(async () => {
		var input = $('<input />', {
			'id':'weight',
			'type': 'number',
			'class': 'clientProfile-user-info-item-text',
			'value': parseInt($('#weight').text()) 
		});
		$('#weight').replaceWith(input);
		$('#weight-save-btn').css('display','flex');
		$('#weight-edit').css('display','none');
	});
    
	$('#weight-save-btn').click(async () => {
		var mydiv = $('<div />', {
			id: 'weight',
			class: 'clientProfile-user-info-item-text',
			text: $('#weight').val() + ' Kg'
		});
		$('#weight').replaceWith(mydiv);
		$('#weight-save-btn').css('display','none');
		$('#weight-edit').css('display','flex');
	});
    
	$('#password-edit').on('click', function (event) {
		event.preventDefault();
		$('#cd-changepass-popup').addClass('is-visible2');
	});

	$('#cd-changepass-popup-close').on('click', function (event) {
		event.preventDefault();
		$('#cd-changepass-popup').removeClass('is-visible2');
		$('#passwordREQ').css('opacity', 0).text('');
		$('#newPasswordREQ').css('opacity', 0).text('');
		$('#old-password').val('');
		$('#new-password').val('');
		$('#confirm-new-password').val('');
	});
	$('#old-password').keydown(function () {
		$('#passwordREQ').css('opacity', 0);
	});
	$('#new-password').keydown(function () {
		$('#newPasswordREQ').css('opacity', 0);
	});


	$(document).keyup(function (event) {
		if (event.which == '27') {
			$('#cd-changepass-popup').removeClass('is-visible2');
			$('#passwordREQ').css('opacity', 0).text('');
			$('#newPasswordREQ').css('opacity', 0).text('');
			$('#old-password').val('');
			$('#new-password').val('');
			$('#confirm-new-password').val('');

		}
	});
	$('#popupConfirmBTN').click(async () => {
		const password = $('#old-password').val();
		const newPassword = $('#new-password').val();
		const confirmPassword = $('#confirm-new-password').val();

		if (password === '') {
			$('#passwordREQ').css('opacity', 1).text('Must enter your Current Password!');
			return;
		}

		if (newPassword === '') {
			$('#newPasswordREQ').css('opacity', 1).text('Must enter your new password!');
			return;
		}

		if (newPassword !== '' && newPassword !== confirmPassword) {
			$('#newPasswordREQ').css('opacity', 1).text('Passwords not match!');
			if (confirmPassword !== '') {
				$('#new-password').val('');
				$('#confirm-new-password').val('');
			}
			return;
		}


        

		if (newPassword !== '' && newPassword === confirmPassword && password !== '') {
			const updatePassword = await fetch('/clients/password', {
				method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
				mode: 'cors', // no-cors, *cors, same-origin
				cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
				credentials: 'same-origin', // include, *same-origin, omit
				headers: {
					'Content-Type': 'application/json'
					// 'Content-Type': 'application/x-www-form-urlencoded',
				},
				redirect: 'follow', // manual, *follow, error
				referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
				body: JSON.stringify({
					password,
					newPassword
				}) // body data type must match "Content-Type" header
			});
			if (updatePassword.status === 400) {
				if(newPassword === password){
					$('#newPasswordREQ').css('opacity', 1).text('New password must not be the same as old password');
					return;
				}

				updatePassword.json().then((body) => {
					if (Object.keys(body).length === 0) {
						$('#passwordREQ').css('opacity', 1).text('The old password you have entered is incorrect!');
						return;
					}
					switch (body.errors['password'].kind) {
					case 'minlength':
						$('#newPasswordREQ').css('opacity', 1).text('Passowrd length most be > 6');
						break;
					case 'user defined':
						$('#newPasswordREQ').css('opacity', 1).text('Password must not contain \'password\'');
						break;
					}
				});
			}
			if (updatePassword.status === 200) {
				$('#successfullyREQ').css('opacity', 1);
				setTimeout(() => {
					$('#cd-changepass-popup').removeClass('is-visible2');
					$('#passwordREQ').css('opacity', 0).text('');
					$('#newPasswordREQ').css('opacity', 0).text('');
					$('#old-password').val('');
					$('#new-password').val('');
					$('#confirm-new-password').val('');
					$('#successfullyREQ').css('opacity', 0);
				}, 1500);
			}
		}
	});
	$('#deleteaccount').on('click',() => {
		$('#cd-popup').addClass('is-visible');
	});
	$('#deleteBTN').on('click', async () => {
		const DeleteAccountReq = await fetch('/client/delmyProfile', {
			method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			headers: {
				'Content-Type': 'application/json'
				// 'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		if (DeleteAccountReq.status === 200) {
			$('#cd-popup').removeClass('is-visible');
			window.location.replace('/');
		}
	});
	$('#cd-popup-cancel-btn-close').on('click',() => {
		$('#cd-popup').removeClass('is-visible');
	});
});