##Test suite 'sneak'

###(describe) 'no shared key'
	 it -> 'should encode'
	 it -> 'should decode'

###(describe) 'shared key'

	(describe) 'when passed as a param'
		 it -> 'should encode'
		 it -> 'should decode'
		 it -> 'should throw if key is not of type Number'

	(describe) 'when set using #setKey API'
		 it -> 'should encode'
		 it -> 'should decode'
		 it -> 'should throw if key is not of type Number'

###(describe) '#generateKey'
	 it -> 'should generate a 10-digit key by default'
	 it -> 'should generate a custom key length when passed a param'