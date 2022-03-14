import { Exclude } from "class-transformer";

export class ProfileDto {

    username: string;

    @Exclude({ toClassOnly: true })
    roleGSISK: string;

    role: string;

    @Exclude({ toClassOnly: true })
    roleGSIPK: string;

    @Exclude({ toClassOnly: true })
    SK: string;
    
}