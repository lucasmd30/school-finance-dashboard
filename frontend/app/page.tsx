"use client";

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

export default function Page() {
  const receitaTotal = "R$ 125.000,00";
  const valorEmAberto = "R$ 18.500,00";
  const inadimplencia = "14.8%";
  const receitaMediaPorAluno = "R$ 850,00";
  const tempoMedioAtraso = "12 dias";
  const despesasTotal = "R$ 78.000,00";

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
                Novembro 2025
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MetricCard
            title="Receita Total do Mês"
            value={receitaTotal}
            icon={DollarSign}
            variant="success"
            description="Maio 2024"
          />
          <MetricCard
            title="Valor Total em Aberto"
            value={valorEmAberto}
            icon={AlertCircle}
            variant="warning"
            description="Pagamentos pendentes"
          />
          <MetricCard
            title="Percentual de Inadimplência"
            value={inadimplencia}
            icon={TrendingDown}
            variant="destructive"
            description="Alunos com atraso"
          />
          <MetricCard
            title="Receita Média por Aluno"
            value={receitaMediaPorAluno}
            icon={Users}
            variant="success"
            description="147 alunos ativos"
          />
          <MetricCard
            title="Tempo Médio de Atraso"
            value={tempoMedioAtraso}
            icon={Clock}
            variant="warning"
            description="Pagamentos em atraso"
          />
          <MetricCard
            title="Controle de Despesas"
            value={despesasTotal}
            icon={CreditCard}
            variant="destructive"
            description="Mês atual"
          />
        </div>
      </main>
    </div>
  );
}
