import Card from './../components/Card';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setJobs, setError } from '../redux/jobSlice';
import Filter from '../components/Filter';

const JobList = () => {
  const state = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get('http://localhost:3030/jobs')
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);

  return (
    <div className="list-page">
      <Filter />

      <h3 className="job-count">
        Bulunan ( {state.mainJobs.length} ) iş arasından ({' '}
        {state.jobs.length} ) tanesini görüntülüyorsunuz
      </h3>

      <section className="list-section">
        {/* Eğerki api'den cevap bekleniyorsa */}
        {!state.initialized && <p>Yükleniyor...</p>}

        {/* Api'den cevap geldiyse ve herhangi bir hata yoksa */}
        {state.initialized && !state.isError ? (
          <>
            {state.jobs.map((job) => (
              <Card key={job.id} job={job} />
            ))}
          </>
        ) : (
          <p>Üzgünüz Bir hata oluştu....</p>
        )}
      </section>
    </div>
  );
};

export default JobList;