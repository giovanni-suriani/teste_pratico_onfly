import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
  // IRequestOptions,
} from 'n8n-workflow';


export class Random implements INodeType {
	description: INodeTypeDescription = {
		// detalhes basicos
		displayName: 'Random',
		name: 'random',
		icon: 'file:dice.svg',
		group: ['transform'],
		version: 1,
		description: 'Generates a random number between min and max',
		defaults: {
			name: 'Random',
		},
		inputs: ['main'],
		outputs: ['main'],

		// credenciais
		credentials: [
		],

		// propriedades (UI)
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trng',
						description: 'Get a true random integer from Random.org',
						action: 'Generate a true random number',
					},
				],
				default: 'trng',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				typeOptions: {
					numberPrecision: 0,
				},
				default: 1,
				description: 'Lower bound (inclusive)',
				required: true,
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				typeOptions: {
					numberPrecision: 0,
				},
				default: 60,
				description: 'Upper bound (inclusive)',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {

			const min = this.getNodeParameter('min', i) as number;
			const max = this.getNodeParameter('max', i) as number;
			// console.log('min', min, 'max', max);

			// Validations
			if (!Number.isFinite(min) || !Number.isFinite(max)) {
				throw new Error('Min and Max must be finite numbers.');
			}
			if (!Number.isInteger(min) || !Number.isInteger(max)) {
				throw new Error('Min and Max must be integers.');
			}
			if (max < min) {
				throw new Error('Max must be greater than or equal to Min.');
			}

			// Url request
			const options = {
				method: 'GET',
				url: 'https://www.random.org/integers/',
				qs: {
					num: 1,
					min,
					max,
					col: 1,
					base: 10,
					format: 'plain',
					rnd: 'new',
				},
				returnFullResponse: false,
			} as const;

			const response = await this.helpers.httpRequest(options);
			// console.log('response', response);

			const value = parseInt(String(response).trim(), 10);
			if (!Number.isInteger(value)) {
				throw new Error('Invalid response from random.org');
			}

			const out: IDataObject = {
				min,
				max,
				value,
				source: 'random.org',
			};

			returnData.push({
				json: out,
			}); 
		}

		return [returnData]; 
	}
}
