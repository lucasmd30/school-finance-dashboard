import api from "@/lib/api";

export type IndicatorsResponse = {
  totalRevenue: number;
  totalPending: number;
  inadimplencyRate: number;
  avgRevenuePerStudent: number;
  avgDelayDays: number;
  totalExpenses: number;
  month?: string;
};

export type Indicators = {
  receitaTotal: number;
  valorEmAberto: number;
  inadimplencia: number;
  receitaMediaPorAluno: number;
  tempoMedioAtraso: number;
  despesasTotal: number;
  mes?: string;
};

export async function getIndicators(): Promise<Indicators> {
  const { data } = await api.get<IndicatorsResponse>("/indicators");
  console.log(data);
  return {
    receitaTotal: data.totalRevenue,
    valorEmAberto: data.totalPending,
    inadimplencia: data.inadimplencyRate,
    receitaMediaPorAluno: data.avgRevenuePerStudent,
    tempoMedioAtraso: data.avgDelayDays,
    despesasTotal: data.totalExpenses,
    mes: data.month,
  };
}

export async function getStudents(params?: Record<string, any>) {
  const { data } = await api.get("/students", { params });
  return data;
}

export async function getExpenses(params?: Record<string, any>) {
  const { data } = await api.get("/expenses", { params });
  return data;
}

export async function getPayments(params?: Record<string, any>) {
  const { data } = await api.get("/payments", { params });
  return data;
}
