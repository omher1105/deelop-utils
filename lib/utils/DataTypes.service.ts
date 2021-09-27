const PATH = require('path');   /* tslint:disable-line */

export class DataTypesService {

    dataTypeNodejs(dataType) {

        let dataTypeReturn = '';
        switch (dataType) {
            case 'integer':
                dataTypeReturn = 'number'
                break;
            case 'bigint':
                dataTypeReturn = 'number'
                break;
            case 'enum':
                dataTypeReturn = 'number'
                break;
            case 'date':
                dataTypeReturn = 'Date'
                break;
            default:
                dataTypeReturn = dataType
                break;
        }

        return dataTypeReturn;
    }

    dataTypeNet(dataType) {

        let dataTypeReturn;
        switch (dataType) {
            case 'integer' || 'enum':
                dataTypeReturn = 'int';
                break;
            case 'bigint':
                dataTypeReturn = 'long';
                break;
            case 'boolean':
                dataTypeReturn = 'bool';
                break;
            case 'string' || 'text' || 'varchar' || 'date':
                dataTypeReturn = 'string';
                break;
            case 'float':
                dataTypeReturn = 'float';
                break;
            case 'date':
                dataTypeReturn = 'DateTime';
                break;

            default:
                dataTypeReturn = dataType;
                break;
        }

        return dataTypeReturn;
    }

    dataTypeJava(dataType) {

        let dataTypeReturn;
        switch (dataType) {
            case 'string' || 'text' || 'varchar':
                dataTypeReturn = 'String';
                break;
            case 'integer' || 'enum':
                dataTypeReturn = 'Long';
                break;
            case 'bigint':
                dataTypeReturn = 'long';
                break;
            case 'float':
                dataTypeReturn = 'float';
                break;
            case 'boolean':
                dataTypeReturn = 'boolean';
                break;
            case 'date':
                dataTypeReturn = 'Date';
                break;
            default:
                dataTypeReturn = dataType;
                break;
        }

        return dataTypeReturn;
    }

    dataTypeGo(dataType) {

        let dataTypeReturn;
        switch (dataType) {
            case 'string' || 'text' || 'varchar':
                dataTypeReturn = 'string';
                break;
            case 'integer' || 'enum':
                dataTypeReturn = 'int';
                break;
            case 'bigint':
                dataTypeReturn = 'int64';
                break;
            case 'float':
                dataTypeReturn = 'float32';
                break;
            case 'boolean':
                dataTypeReturn = 'bool';
                break;
            case 'date':
                dataTypeReturn = 'string';
                break;
            default:
                dataTypeReturn = dataType;
                break;
        }

        return dataTypeReturn;
    }

    /* tslint:disable-next-line */
    dataTypePython(dataType, primaryKey = false, auto_increment = false) {

        let dataTypeReturn;
        switch (dataType) {
            case 'string' || 'text':
                dataTypeReturn = 'TextField()';
                break;
            case 'varchar':
                dataTypeReturn = 'CharField(max_length=255)';
                break;
            case 'boolean':
                dataTypeReturn = 'BooleanField()';
                break;
            case 'integer' || 'enum':
                dataTypeReturn = 'IntegerField()';
                break;
            case 'float':
                dataTypeReturn = 'FloatField()';
                break;
            case 'date':
                dataTypeReturn = 'DateField(auto_now = False , auto_now_add = False)';
                break;
            default:
                dataTypeReturn = 'TextField()';
                break;
        }

        if (auto_increment === true && primaryKey === true) {

            let dataTypeReturnPrimary;
            switch (dataTypeReturn) {
                case 'IntegerField()':
                    dataTypeReturnPrimary = 'BigAutoField(primary_key=True)';
                    break;
                default:
                    dataTypeReturnPrimary = dataTypeReturn;
                    break;
            }
            dataTypeReturn = dataTypeReturnPrimary;

        } else
            if (primaryKey === true) {

                let dataTypeReturnPrimary;
                switch (dataTypeReturn) {
                    case 'IntegerField()':
                        dataTypeReturnPrimary = 'BigAutoField(primary_key=True)';
                        break;
                    case 'TextField()':
                        dataTypeReturnPrimary = 'TextField(primary_key=True)';
                        break;
                    case 'FloatField()':
                        dataTypeReturnPrimary = 'FloatField(primary_key=True)';
                        break;
                    case 'DateField(auto_now = False , auto_now_add = False)':
                        dataTypeReturnPrimary = 'FloDateFieldatField(auto_now = False , auto_now_add = False, primary_key=True)';
                        break;
                    case 'BooleanField()':
                        dataTypeReturnPrimary = 'BooleanField(primary_key=True)';
                        break;
                    case 'CharField(max_length=255)':
                        dataTypeReturnPrimary = 'CharField(max_length=255, primary_key=True)';
                        break;
                    default:
                        dataTypeReturnPrimary = dataTypeReturn;
                        break;
                }
                dataTypeReturn = dataTypeReturnPrimary;
            } else
                if (auto_increment === true) {

                    let dataTypeReturnAutoIncrement;
                    switch (dataTypeReturn) {
                        case 'IntegerField()':
                            dataTypeReturnAutoIncrement = 'BigAutoField()';
                            break;
                        default:
                            dataTypeReturnAutoIncrement = dataTypeReturn;
                            break;
                    }
                    dataTypeReturn = dataTypeReturnAutoIncrement;

                }

        return dataTypeReturn;
    }
