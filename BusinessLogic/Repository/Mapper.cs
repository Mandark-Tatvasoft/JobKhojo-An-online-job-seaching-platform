
using AutoMapper;
using Data.Data;
using Data.Models;

namespace BusinessLogic.Repository
{
    public class Mapper : Profile
    {
        public Mapper()
        {
            CreateMap<User, SignupModel>()
                .ForMember(sm => sm.Password, o => o.MapFrom(u => u.PasswordHashed)).ReverseMap();
            CreateMap<Job, JobModel>()
                .ForMember(jm => jm.AppliedBy, o => o.MapFrom(j => j.AppliedBy!.Count())).ReverseMap();
            CreateMap<User, UserModel>()
                .ForMember(um => um.RoleId, o => o.MapFrom(u => u.RoleId.ToString())).ReverseMap();
            CreateMap<User, RecruiterModel>().ReverseMap();
            CreateMap<User, ProfileModel>().ReverseMap();
            CreateMap<Location, LocationModel>()
                .ForMember(lm => lm.LocationName, o => o.MapFrom(l => l.Location1))
                .ForMember(lm => lm.LocationId, o => o.MapFrom(l => l.Id)).ReverseMap();
            CreateMap<JobType, JobTypeModel>()
                .ForMember(jtm => jtm.JobType, o => o.MapFrom(jt => jt.JobType1))
                .ForMember(jtm => jtm.JobTypeId, o => o.MapFrom(jt => jt.Id));
        }
    }
}
