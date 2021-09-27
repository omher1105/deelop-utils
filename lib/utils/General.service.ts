import { ResponseFunctionGeneral } from '../dto/ResponseData';

const FS = require('fs'); /* tslint:disable-line */
const ARCHIVER = require('archiver'); /* tslint:disable-line */
const UNZIPPER = require('unzipper'); /* tslint:disable-line */
const PATH = require('path');   /* tslint:disable-line */
const RMDIR = require('rimraf'); /* tslint:disable-line */

export class GeneralService {

    async createFolder(folder: string): Promise<ResponseFunctionGeneral> {

        if (!FS.existsSync(folder)) {
            await FS.promises.mkdir(folder, { recursive: true });
        }

        return { response: true };
    }


    async existsElement(element: string): Promise<ResponseFunctionGeneral> {

        let responseData;
        if (FS.existsSync(element)) {
            responseData = { response: true };
        } else {
            responseData = { response: false };
        }

        return responseData;
    }


    async createAndwriteFile(routeFile: string, data: string = ''): Promise<ResponseFunctionGeneral> {
        await FS.writeFileSync(routeFile, data, (err) => { if (err) throw err; });
        return { response: true };
    }


    async renameFolder(currPath: string, newPath: string = ''): Promise<ResponseFunctionGeneral> {
        await FS.rename(currPath, newPath, function (err) { /* tslint:disable-line */
            if (err) {
                console.log(err); /* tslint:disable-line */
            }
        })
        return { response: true };
    }

    async deleteIfExists(path) {
        if (FS.existsSync(path)) {
            await this.deleteFolder(path);
        }
        return true;
    }


    readFile(routeFile: string): Promise<ResponseFunctionGeneral> {

        return new Promise((resolve, reject) => {
            FS.readFile(routeFile, 'utf8', (err, dataRes) => {
                if (err) {
                    reject(err);
                }

                resolve({ response: true, data: dataRes });
            });
        });

    }

    async deleteFolder(routeFolder: string): Promise<ResponseFunctionGeneral> {
        await RMDIR(routeFolder, function (error) { console.log(error); }); /* tslint:disable-line */
        return { response: true };
    }

    getRandomArbitrary(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    async zipFolder(routeFolder: string, routeFolderPublic: string, projectName: string): Promise<boolean> {
        const OUTPUT = FS.createWriteStream(routeFolderPublic + '.zip');
        const ARCHIVE = ARCHIVER('zip', {
            zlib: { level: 9 } // Sets the compression level.
        });

        OUTPUT.on('close', () => { }); /* tslint:disable-line */

        ARCHIVE.pipe(OUTPUT);

        ARCHIVE.directory(routeFolder, projectName);

        await ARCHIVE.finalize();

        return true;
    }

    async unzipFolder(urlZip: string, urlExtract: string) {
        await new Promise((resolve, reject) => {
            FS.createReadStream(urlZip)
                .pipe(UNZIPPER.Extract({ path: urlExtract }))
                .on('close', () => resolve(true))
                .on('error', (error) => reject(error))
        })
        return true;
    }


    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async createCommonFolders(language, client, repositoryName: string = '') {

        if (repositoryName !== '') {
            await this.deleteIfExists(`${__dirname}/../../../../tmp/client/static/${language}/${client}/${repositoryName}`);
        }

        await this.createFolder(PATH.join(`${__dirname}/../../../../tmp`));
        await this.createFolder(PATH.join(`${__dirname}/../../../../tmp/client`));
        await this.createFolder(PATH.join(`${__dirname}/../../../../tmp/client/static`));
        await this.createFolder(PATH.join(`${__dirname}/../../../../tmp/client/static/${language}`));
        await this.createFolder(PATH.join(`${__dirname}/../../../../tmp/client/static/${language}/${client}`));
    }

}
