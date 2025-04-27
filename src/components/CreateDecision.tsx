'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { PlusIcon, TrashIcon } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useSession } from 'next-auth/react';

type Option = {
    id: number;
    title: string;
    pros: string[];
    cons: string[];
};

export default function CreateDecision() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Pending');
    const [options, setOptions] = useState<Option[]>([{
        id: 1,
        title: '',
        pros: [''],
        cons: ['']
    }]);

    const userId = useSession().data?.user.id;

    // Option handlers
    const addOption = () => setOptions([...options, { id: Number(nanoid()), title: '', pros: [''], cons: [''] }]);
    const removeOption = (index: number) => setOptions(options.filter((_, i) => i !== index));
    const updateOption = (index: number, field: keyof Option, value: string) => {
        const updated: any = [...options];
        updated[index][field] = value;
        setOptions(updated);
    };

    // List item handlers (pros/cons)
    const updateListItem = (optionIndex: number, type: 'pros' | 'cons', listIndex: number, value: string) => {
        const updated = [...options];
        updated[optionIndex][type][listIndex] = value;
        setOptions(updated);
    };

    const addListItem = (optionIndex: number, type: 'pros' | 'cons') => {
        const updated = [...options];
        updated[optionIndex][type].push('');
        setOptions(updated);
    };

    const removeListItem = (optionIndex: number, type: 'pros' | 'cons', listIndex: number) => {
        const updated = [...options];
        updated[optionIndex][type] = updated[optionIndex][type].filter((_, i) => i !== listIndex);
        setOptions(updated);
    };

    const handleSubmit = async () => {
        const decision = { title, description, options, status };
        console.log("Frontend decision", decision);
        try {
            const res = await fetch('/api/decision/new', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ decision, userId })
            });
            const resData = await res.json();
            if (!res.ok) {
                alert(`Error: ${resData.message}`);

            } else {
                alert('Decision submitted!');
            }
        } catch (error) {
            console.error('Error submitting decision:', error);
            alert('Error submitting decision. Please try again.');
            return;
        }
        alert('Decision submitted!');
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6">
            <h1 className="text-3xl font-bold mb-6">Create Decision</h1>

            <Card className="p-6">
                <div className="space-y-6">
                    <div>
                        <Label>Title</Label>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Decision title"
                        />
                    </div>

                    <div>
                        <Label>Description</Label>
                        <Textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your decision"
                            rows={3}
                        />
                    </div>

                    {options.map((option, idx) => (
                        <Card key={option.id} className="p-4">
                            <div className="flex justify-between items-center mb-3">
                                <h3 className="font-medium">Option {idx + 1}</h3>
                                {options.length > 1 && (
                                    <Button variant="ghost" size="sm" onClick={() => removeOption(idx)}>
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                )}
                            </div>

                            <Input
                                value={option.title}
                                onChange={(e) => updateOption(idx, 'title', e.target.value)}
                                placeholder="Option title"
                                className="mb-4"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Pros</Label>
                                    <div className="space-y-2">
                                        {option.pros.map((pro, proIdx) => (
                                            <div key={proIdx} className="flex gap-2">
                                                <Input
                                                    value={pro}
                                                    onChange={(e) => updateListItem(idx, 'pros', proIdx, e.target.value)}
                                                    placeholder={`Pro ${proIdx + 1}`}
                                                />
                                                {option.pros.length > 1 && (
                                                    <Button variant="ghost" size="sm" onClick={() => removeListItem(idx, 'pros', proIdx)}>
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => addListItem(idx, 'pros')}>
                                            <PlusIcon className="w-4 h-4 mr-2" /> Add Pro
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label>Cons</Label>
                                    <div className="space-y-2">
                                        {option.cons.map((con, conIdx) => (
                                            <div key={conIdx} className="flex gap-2">
                                                <Input
                                                    value={con}
                                                    onChange={(e) => updateListItem(idx, 'cons', conIdx, e.target.value)}
                                                    placeholder={`Con ${conIdx + 1}`}
                                                />
                                                {option.cons.length > 1 && (
                                                    <Button variant="ghost" size="sm" onClick={() => removeListItem(idx, 'cons', conIdx)}>
                                                        <TrashIcon className="w-4 h-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        ))}
                                        <Button variant="outline" size="sm" onClick={() => addListItem(idx, 'cons')}>
                                            <PlusIcon className="w-4 h-4 mr-2" /> Add Con
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}

                    <div className="flex gap-3">
                        <Button variant="outline" onClick={addOption}>
                            <PlusIcon className="w-4 h-4 mr-2" /> Add Option
                        </Button>
                        <div className="flex items-center gap-3">
                            <select onChange={
                                (e) => setStatus(e.target.value)
                            } className="border rounded-md p-2">
                                <option value="Pending">Pending</option>
                                <option value="InProgress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <Button onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}