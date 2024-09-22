export class GetCurrentUserDto {
  user: {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly isActive: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;
  };
}
