# server

IBM Cloud Function (OpenWhisk) action for NLU

1. Login and set your target organization and space

	```shell
	bx login
	bx target -o <YOUR-ORGANIZATION> -s <YOUR-SPACE>
	```

2. Apply your Watson Natural Language Understanding service credentials

	```
	vi server/index.js
	```
	Note: `:wq!` will save an exit from `vi`
	
3. Replace line `<YOUR-USERNAME>` and `<YOUR-PASSWORD>` with your service credentials

	```javascript
	const nlu = new NaturalLanguageUnderstandingV1({
	  username: '<YOUR-USERNAME>',
	  password: '<YOUR-PASSWORD>',
	  version_date: '2017-02-27',
	})
	```

4. Deploy the OpenWhisk action (IBM Cloud Function)

	```shell
	 bx wsk action update /<YOUR-ORGANIZATION>_<YOUR-SPACE>/demo/nlu_analyze index.js --web true --kind nodejs:8
	```
