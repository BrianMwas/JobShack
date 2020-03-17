


export class User {
	id: string;
	fullName:string;
	email: string;
	profile: [];
	applications: [];
	qualifications: [];

	constructor(obj?: any) {
		this.id = obj && obj.id || '';
		this.fullName = obj && obj.fullName || '';
		this.email = obj && obj.email || '';
		this.profile = obj && obj.profile || [];
		this.applications = obj && obj.applications || [];
		this.qualifications = obj && obj.qualifications || [];
	}
}