"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const typeorm_2 = require("@nestjs/typeorm");
let CategoryService = class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async create(createCategoryDto, id) {
        const isExist = await this.categoryRepository.findBy({
            user: { id },
            title: createCategoryDto.title,
        });
        if (isExist.length)
            throw new common_1.BadRequestException('This category already exists');
        const newCategory = {
            title: createCategoryDto.title,
            user: { id },
        };
        return await this.categoryRepository.save(newCategory);
    }
    async findAll(id) {
        return await this.categoryRepository.find({
            where: { user: { id } },
            relations: {
                transactions: true,
            },
        });
    }
    async findOne(categoryId) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
            relations: { user: true, transactions: true },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return category;
    }
    async update(categoryId, updateCategoryDto) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return await this.categoryRepository.update(categoryId, updateCategoryDto);
    }
    async remove(categoryId) {
        const category = await this.categoryRepository.findOne({
            where: { id: categoryId },
        });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        return await this.categoryRepository.delete(categoryId);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(category_entity_1.Category)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CategoryService);
//# sourceMappingURL=category.service.js.map