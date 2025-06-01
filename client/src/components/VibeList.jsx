import VibeCard from './VibeCard';

const VibeList = ({ vibes }) => {

    const sortedVibes = [...vibes].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <div className="d-flex flex-column align-items-center">
            {sortedVibes.map(vibe => (
                <div className="w-100 mb-4" key={vibe._id} style={{ maxWidth: '600px' }}>
                    <VibeCard vibe={vibe} />
                </div>
            ))}
            {!vibes.length && <h3 className="text-muted mt-4">No vibes to show. Post your new vibe!</h3>}
        </div>
    )
}

export default VibeList
