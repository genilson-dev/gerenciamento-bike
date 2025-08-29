export interface MusicoRequest {
    name: string;
    sexo: string;
    status_aluno?: string;
    status_ensaios?: string;
    status_rjm?: string;
    status_cultos_oficiais?: string;
    status_oficializado?: string;
    organista?: string;
    organista_aluna?: string;
    organista_rjm?: string;
    organista_cultos_oficiais?: string;
    organista_oficializada?: string;
    possui_instrumento_proprio?: string;
    instrumento?: string,
    tonalidade?: string;
    encarregado_local?: string;
    encarregado_regional?: string;
    instrutor?: string;
    examinadora?: string;
}
