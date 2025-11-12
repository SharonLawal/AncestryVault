const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const submitPersonData = async (formData) => {
    const data = new FormData();
    
    data.append('fullname', formData.step1.fullname);
    data.append('date_of_birth', formData.step1.date_of_birth);
    data.append('gender', formData.step1.gender);
    data.append('profession', formData.step1.profession || '');
    data.append('description', formData.step1.description || '');
    data.append('parent', formData.step1.parent || '');
    data.append('spouse', formData.step1.spouse || '');
    
    if (formData.step1.profile_picture) {
        data.append('profile_picture', formData.step1.profile_picture);
    }
    
    if (formData.video_description) {
        data.append('video_description', formData.video_description, 'legacy-video.webm');
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/persons/`, {
            method: 'POST',
            body: data,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Server error:', errorData);
            throw new Error('Failed to submit data');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error submitting data:', error);
        throw error;
    }
};