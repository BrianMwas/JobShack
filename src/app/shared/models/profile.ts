export class Profile {
	user: string
	username: string;
	profileImage: string;
	description: string;
	telephone: string;
	role: string;


	constructor(obj? : any) {
		this.user = obj && obj.user || null;
		this.role = obj && obj.role || null;

		this.username = obj && obj.username || null;
		this.profileImage = obj && obj.profileImage || null;
		this.description = obj && obj.description || null;
		this.telephone = obj && obj.telephobe || null;
	}
}
