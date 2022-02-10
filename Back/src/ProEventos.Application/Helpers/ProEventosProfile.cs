using AutoMapper;
using ProEventos.Domain;
using ProEventos.Application.Dtos;
using ProEventos.Domain.Identity;
using ProEventos.Persistence.Models;

namespace ProEventos.Application.Helpers
{
    public class ProEventosProfile : Profile
    {
        public ProEventosProfile()
        {
            CreateMap<Evento, EventoDto>().ReverseMap();
            CreateMap<Lote, LoteDto>().ReverseMap();
            CreateMap<RedeSocial, RedeSocialDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteAddDto>().ReverseMap();
            CreateMap<Palestrante, PalestranteUpdateDto>().ReverseMap();

            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<User, UserLoginDto>().ReverseMap();
            CreateMap<User, UserUpdateDto>().ReverseMap();

            // Passar Mapping de Auto > Manual (Mais controle e noção do que está sendo mapeado)
            // CreateMap<Palestrante, PalestranteDto>()
            //         .ForMember(x => x.Id, opt => opt.MapFrom(m => m.Id))
            //         .ForMember(x => x.MiniCurriculo, opt => opt.MapFrom(m => m.MiniCurriculo))
            //         .ForMember(x => x.UserId, opt => opt.MapFrom(m => m.UserId))
            //         .ForMember(x => x.User, opt => opt.MapFrom(m => m.User))
            //         .ForMember(x => x.RedesSociais, opt => opt.MapFrom(m => m.RedesSociais))
            //         .ForMember(x => x.Eventos, opt => opt.MapFrom(m => m.PalestrantesEventos));
        }

    }
}