"use client";

import { useEffect, useState } from "react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { t } from "@/lib/theme";
import {
  DollarSign,
  AlertCircle,
  TrendingDown,
  Users,
  Clock,
  CreditCard,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { getIndicators } from "@/services/dashboardService";

type Indicators = {
  receitaTotal: number;
  valorEmAberto: number;
  inadimplencia: number;
  receitaMediaPorAluno: number;
  tempoMedioAtraso: number;
  despesasTotal: number;
  mes?: string;
};

export default function Page() {
  const [data, setData] = useState<Indicators | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const res = await getIndicators();
        if (active) setData(res);
      } catch (err) {
        console.error("Erro ao buscar indicadores:", err);
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Carregando indicadores...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold text-red-500">
          Erro ao carregar os dados.
        </p>
      </div>
    );
  }

  const currencyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const percentFormat = new Intl.NumberFormat("pt-BR", {
    style: "percent",
    minimumFractionDigits: 2,
  });

  return (
    <div className={cn("min-h-screen", t("bg-background"))}>
      <header className={cn(t("bg-card"), "border-b", t("border-border"))}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={cn("text-3xl font-bold", t("text-card"))}>
                Dashboard Financeiro
              </h1>
              <p className={cn(t("text-muted"), "mt-1")}>
                Visão geral das finanças da escola
              </p>
            </div>
            <div className="text-right">
              <p className={cn("text-sm", t("text-muted"))}>Período atual</p>
              <p className={cn("text-lg font-semibold", t("text-card"))}>
                {data.mes ?? "—"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Receita Total do Mês"
            value={currencyFormat.format(data.receitaTotal)}
            icon={DollarSign}
            variant="success"
            description={data.mes ?? "Mês atual"}
          />

          <MetricCard
            title="Valor Total em Aberto"
            value={currencyFormat.format(data.valorEmAberto)}
            icon={AlertCircle}
            variant="warning"
            description="Pagamentos pendentes"
          />

          <MetricCard
            title="Percentual de Inadimplência"
            value={percentFormat.format(data.inadimplencia)}
            icon={TrendingDown}
            variant="destructive"
            description="Alunos com atraso"
          />

          <MetricCard
            title="Receita Média por Aluno"
            value={currencyFormat.format(data.receitaMediaPorAluno)}
            icon={Users}
            variant="success"
            description="Alunos ativos"
          />

          <MetricCard
            title="Tempo Médio de Atraso"
            value={`${Number(data.tempoMedioAtraso).toLocaleString("pt-BR", {
              minimumFractionDigits: 1,
              maximumFractionDigits: 1,
            })} dias`}
            icon={Clock}
            variant="warning"
            description="Pagamentos em atraso"
          />
          <MetricCard
            title="Despesas Totais"
            value={currencyFormat.format(data.despesasTotal)}
            icon={CreditCard}
            variant="destructive"
            description="Mês atual"
          />
        </div>
      </main>
    </div>
  );
}
