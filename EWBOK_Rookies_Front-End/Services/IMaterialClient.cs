using SharedVm;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Front_End.Services
{
    public interface IMaterialClient
    {
        Task<IList<MaterialVm>> GetMaterials();
    }
}