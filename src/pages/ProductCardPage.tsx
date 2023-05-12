import { useParams } from 'react-router-dom'

export default function ProductCardPage() {
    const params = useParams()

    return (
        <div>ProductCardPage ID = {params.id}</div>
    )
}
