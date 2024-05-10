import { v4 } from 'uuid';
import { statusOpt, typeOpt } from '../helpers/contants';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addJob } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddJob = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // formData oluşturma
    const form = new FormData(e.target);
    // formdaki değerlerden bir obje oluşturma
    const newJob = Object.fromEntries(form.entries());

    //  select'ler seçildmi kontrol etme
    if (!newJob.type || !newJob.status) {
      toast.info('Tüm alanları doldurun');
      return;
    }

    // objeye id ekleme
    newJob.id = v4();

    // tarih ekleme
    newJob.date = new Date().toLocaleDateString();

    //! 1.adım > veriyi api'ye ekleme
    axios
      .post('http://localhost:3030/jobs', newJob)
      .then(() => {
        //! 2.adım > store'u güncelle
        dispatch(addJob(newJob));

        // anasayfaya yönlednir
        navigate('/');

        // bildirim ver
        toast.success('İş Başarıyla Eklendi');
      })
      .catch(() => toast.error('Beklenmedik bir hata oluştu..'));
  };

  return (
    <div className="add-sec">
      <h2>Yeni İş Ekle</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pozisyon</label>
          <input required name="position" type="text" />
        </div>

        <div>
          <label>Şirket</label>
          <input required name="company" type="text" />
        </div>

        <div>
          <label>Lokasyon</label>
          <input required name="location" type="text" />
        </div>

        <div>
          <label>Durum</label>
          <select name="status">
            <option selected disabled>
              Seçiniz
            </option>
            {statusOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select name="type">
            <option selected disabled>
              Seçiniz
            </option>
            {typeOpt.map((opt, i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <button>Ekle</button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;