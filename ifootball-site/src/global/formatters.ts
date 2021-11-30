export const formatCpf = (data: string) => {
  const formattedData = data.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
  return formattedData
}