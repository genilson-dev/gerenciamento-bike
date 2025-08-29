export interface MusicoRequest {
    name: string;
    sexo: string;
    encarregado_local: boolean;
    encarregado_regional: boolean;
    instrutor: boolean;
    examinadora: boolean;
    aluno: boolean;
    ensaios: boolean;
    rjm: boolean;
    cultos_oficiais: boolean;
    oficializado: boolean;
    possui_instrumento_proprio: boolean;
    instrumento: boolean;
    tonalidade?: string;
}
