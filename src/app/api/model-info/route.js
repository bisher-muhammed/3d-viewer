export async function GET() {
    // Hardcoded model metadata (different from Python backend)
    const modelInfo = {
        model_scale: 1.5,
        face_count: 12000,
        format: 'OBJ',
        texture_type: 'Normal map applied'
    };

    return Response.json(modelInfo);
}
