<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;

class TicketController extends Controller
{
    private function rules(): array
    {
        return [
            'requester_name'  => 'required|string|max:255',
            'requester_email' => 'required|email|max:255',
            'issue_category'  => 'required|string|max:100',
            'priority'        => 'required|in:Low,Medium,High,Critical',
            'subject'         => 'required|string|max:255',
            'description'     => 'required|string',
            'status'          => 'sometimes|in:Open,In Progress,Resolved,Closed',
        ];
    }

    public function index()
    {
        return Ticket::orderByDesc('created_at')->get();
    }

    public function store(Request $request)
    {
        $ticket = Ticket::create($request->validate($this->rules()));
        $ticket->update(['ticket_number' => 'TKT-' . str_pad($ticket->id, 5, '0', STR_PAD_LEFT)]);

        return response()->json($ticket->fresh(), 201);
    }

    public function show(Ticket $ticket)
    {
        return $ticket;
    }

    public function update(Request $request, Ticket $ticket)
    {
        $ticket->update($request->validate($this->rules()));

        return $ticket->fresh();
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();

        return response()->noContent();
    }
}
