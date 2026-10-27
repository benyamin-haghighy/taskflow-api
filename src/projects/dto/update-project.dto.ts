import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';

export class UpdateProjectDto extends PickType(CreateProjectDto, ['name'] as const) {
}
