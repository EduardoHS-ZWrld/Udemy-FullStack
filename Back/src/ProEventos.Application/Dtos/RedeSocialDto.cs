namespace ProEventos.Application.Dtos
{
    public class RedeSocialDto
    {
        public int id { get; set; }
        public string Nome { get; set; }
        public string URL { get; set; }
        public int? EventoId { get; set; }
        public EventoDto Eventos { get; set; }
        public int? PalestranteId { get; set; }
        public PalestranteDto Palestrantes { get; set; }
    }
}