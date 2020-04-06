import { Qualification } from './qualification';
import { User } from './user';
import { Profile } from './profile';

export class Application {
	user: User;
	profile: Profile;
	status: Status;
	qualification: Qualification
	createdAt: Date;

	constructor (obj?: any) {
		this.user = obj && obj.user || '';
		this.qualification = obj && obj.qualification || null;
		this.profile = obj && obj.user.profile || null;
		this.status = obj && obj.status || Status.pending;
		this.createdAt = obj && obj.createdAt || new Date();
	}
}

enum Status {
	pending = "pending",
	accepted = "accepted",
	processed = "processed"
}
