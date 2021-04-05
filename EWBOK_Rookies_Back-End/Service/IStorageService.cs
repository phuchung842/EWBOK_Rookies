using System.IO;
using System.Threading.Tasks;

namespace EWBOK_Rookies_Back_End.Service
{
    public interface IStorageService
    {
        string GetFileUrl(string fileName);

        Task SaveFileAsync(Stream mediaBinaryStream, string fileName);

        Task DeleteFileAsync(string fileName);
    }
}