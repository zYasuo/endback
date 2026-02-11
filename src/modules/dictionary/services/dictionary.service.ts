import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { DICTIONARY_MODULE_TOKENS } from "../constants/dictonary.tokens";
import type { IDictionaryService } from "./interfaces/dictionary-service.interface";
import type { DictionaryApiClient } from "../client/client.api";
import type { IWordService } from "../modules/words/services/interfaces/words-service.interface";

@Injectable()
export class DictionaryService implements IDictionaryService {
    constructor(
        @Inject(DICTIONARY_MODULE_TOKENS.DICTIONARY_CLIENT)
        private readonly dictionaryClient: DictionaryApiClient,
        @Inject(DICTIONARY_MODULE_TOKENS.WORDS_SERVICE)
        private readonly wordsService: IWordService,
    ) {}

    async getWord(language: string, word: string) {
        try {
            const data = await this.dictionaryClient.getWord(language, word);
            const entry = Array.isArray(data) ? data[0] : data;
            if (entry) {
                const existing = await this.wordsService.findByWord(entry.word);
                if (!existing) {
                    await this.wordsService.createFromApiEntry(entry);
                }
                await this.wordsService.addToRecentWords(entry.word);
            }
            return data;
        } catch (error) {
            if (error?.response?.status === 404) {
                throw new NotFoundException(`Word "${word}" not found`);
            }
            throw error;
        }
    }
}
