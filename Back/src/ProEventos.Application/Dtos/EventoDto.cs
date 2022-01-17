using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório.")]
        public string Local { get; set; }
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         StringLength(50, MinimumLength = 6,
            ErrorMessage = "Intervalo permitido de 6 a 50 caracteres.")]
        public string Tema { get; set; }

        [Display(Name = "Qtd Pessoas"),
         Range(1, 120000, ErrorMessage = "{0} deve ter entre 1 e 120.000 pessoas.")]
        public int QtdPessoas { get; set; }

        [RegularExpression(@".*|.(gif|jpe?g|bmp|png)$",
                           ErrorMessage = "Não é um formato de imagem válida (bmp, gif, jpg, jpeg, png)")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         Phone(ErrorMessage = "O {0} contém um número inválido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório."),
         Display(Name = "e-mail"),
         EmailAddress(ErrorMessage = "Deve conter um {0} válido.")]
        public string Email { get; set; }
        public IEnumerable<LoteDto> Lotes { get; set; }
        public IEnumerable<RedeSocialDto> RedesSociais { get; set; }
        public IEnumerable<PalestranteDto> PalestrantesEventos { get; set; }
    }
}