import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
  IRequestOptions,
} from 'n8n-workflow';


export class FriendGrid implements INodeType {
	description: INodeTypeDescription = {
		// detalhes basicos
		displayName: 'FriendGridExemplo',
		name: 'friendGridExemplo',
		icon: 'file:friendGrid.svg',
		group: ['transform'],
		version: 1,
		description: 'Consume SendGrid API',
		defaults: {
			name: 'FriendGrid',
		},
		inputs: ['main'],
		outputs: ['main'],

		// credenciais
		credentials: [
			{
				name: 'friendGridApi',
				required: true,
			},
		],

		// propriedades (UI)
		properties: [
			// Recurso
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: [
					{
						name: 'Contact',
						value: 'contact',
					},
				],
				default: 'contact',
				noDataExpression: true,
				required: true,
				description: 'Create a new contact',
			},

			// Operação
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['contact'],
					},
				},
				options: [
					{
						name: 'Create',
						value: 'create',
						description: 'Create a contact',
						action: 'Create a contact',
					},
				],
				default: 'create',
				noDataExpression: true,
			},

			// Campo obrigatório: Email
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						operation: ['create'],
						resource: ['contact'],
					},
				},
				default: '',
				placeholder: 'name@email.com',
				description: 'Primary email for the contact',
			},

			// Campos opcionais
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['contact'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'First Name',
						name: 'firstName',
						type: 'string',
						default: '',
					},
					{
						displayName: 'Last Name',
						name: 'lastName',
						type: 'string',
						default: '',
					},
				],
			},
		],
	};

	// executa a cada execução do node
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// dados de entrada (de nodes anteriores)
		const items = this.getInputData();
		let responseData;
		const returnData: IDataObject[] = [];

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// itera pelos itens de entrada

		 for (let i = 0; i < items.length; i++) {
      if (resource === 'contact' && operation === 'create') {
        const email = this.getNodeParameter('email', i) as string;
        const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

        const data: IDataObject = { email, ...additionalFields };

        // ✅ use IRequestOptions em vez de OptionsWithUri
        const options: IRequestOptions = {
          method: 'PUT',
          uri: 'https://api.sendgrid.com/v3/marketing/contacts', // string pura
          headers: { Accept: 'application/json' },
          json: true,   // (ainda aceito no helper)
          body: { contacts: [data] },
        };

        responseData = await this.helpers.requestWithAuthentication.call(
          this,
          'friendGridApi',
          options,
        );
        returnData.push(responseData as IDataObject);
      }
    }
		// retorna no formato n8n
		return [this.helpers.returnJsonArray(returnData)];
	}
}
