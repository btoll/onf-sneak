##Test suite 'sneak'

###(describe) 'no shared key'
	 it -> 'should not encode'
	 it -> 'should not decode'

###(describe) '#encode'

	(describe) 'when key is passed as a param'
		 it -> 'should encode'
		 it -> 'should not throw if key is of type Number or BigNum'
		 it -> 'should throw if key is not of type Number or BigNum'

	(describe) 'when key is set prior'
		 it -> 'should encode'
		 it -> 'should not throw if key is of type Number or BigNum'
		 it -> 'should throw if key is not of type Number or BigNum'

###(describe) '#decode'

	(describe) 'when key is passed as a param'
		 it -> 'should decode'
		 it -> 'should not throw if key is of type Number or BigNum'
		 it -> 'should throw if key is not of type Number or BigNum'

	(describe) 'when key is set prior'
		 it -> 'should decode'
		 it -> 'should not throw if key is of type Number or BigNum'
		 it -> 'should throw if key is not of type Number or BigNum'

###(describe) '#generateKey'
	 it -> 'should generate a BigNum key'
	 it -> 'should generate a 50-digit key by default'
	 it -> 'should generate keys of varying lengths'

###(describe) '#getKey'
	 it -> 'should return the shared key'
	 it -> 'should return a type BigNum'

###(describe) '#setKey'
	 it -> 'should allow type Number'
	 it -> 'should allow type BigNum'
	 it -> 'should convert type Number to BigNum'
	 it -> 'should throw if setting a key not of type Number or BigNum '