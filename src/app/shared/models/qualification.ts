export class Qualification {
	_id: number;
	user: string;
	qualificationType: QualificationType;
	institute: string;
	startDate: Date;
	endDate: Date;
	description: string;

	constructor(obj?: any) {
		this._id = obj && obj._id || new Date().getDate();
		this.user = obj && obj.user || '';
		this.qualificationType = obj && obj.qualificationType || QualificationType.Education;
		this.institute = obj && obj.institute || '';
		this.startDate = obj && obj.startDate || new Date();
		this.endDate = obj && obj.endDate || new Date();
		this.description = obj && obj.description || '';
	}
}

enum QualificationType {
	Education = "Education",
	WorkExperience = "Work Experience",
	SeminarsandActivations = "Seminar and Activations",
	Other = "Other"
}